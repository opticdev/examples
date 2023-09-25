package main

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"reflect"
	"strings"
	"testing"
)

var router *gin.Engine
var client *http.Client

func init() {
	router = setupRouter()
}

func TestRoot(t *testing.T) {
	server := httptest.NewServer(router)
	defer server.Close()

	client := &http.Client{
		Transport: &http.Transport{
			Proxy: http.ProxyURL(getProxy()),
		},
	}
	resp, err := client.Get(server.URL + "/")
	if err != nil {
		t.Fatalf("Request failed: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d, but got %d", http.StatusOK, resp.StatusCode)
	}
}

func TestUsers(t *testing.T) {
	server := httptest.NewServer(router)
	defer server.Close()

	client := &http.Client{
		Transport: &http.Transport{
			Proxy: http.ProxyURL(getProxy()),
		},
	}
	resp, err := client.Get(server.URL + "/users")
	if err != nil {
		t.Fatalf("Request failed: %v", err)
	}
	defer resp.Body.Close()

	// verify status code
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expcted status code %d, but got %d", http.StatusOK, resp.StatusCode)
	}

	// parse response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Errorf("Couldn't read response body: %v", err)
	}

	var users []User
	err = json.Unmarshal(body, &users)
	if err != nil {
		t.Fatalf("Failed to unmarshal response body: %v", err)
	}

	// verify response body
	if !reflect.DeepEqual(Users, users) {
		t.Errorf("Expected response %v but got %v", Users, users)
	}
}

func TestCreateUser(t *testing.T) {
	server := httptest.NewServer(router)
	defer server.Close()

	payload := `{"name":"Hank"}`
	client := &http.Client{
		Transport: &http.Transport{
			Proxy: http.ProxyURL(getProxy()),
		},
	}
	resp, err := client.Post(server.URL+"/users/create", "application/json", strings.NewReader(payload))
	if err != nil {
		t.Fatalf("Failed to create request: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated {
		t.Errorf("Expected status code %d but got %d", http.StatusCreated, resp.StatusCode)
	}

	// parse response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("Couldn't read response body: %v", err)
	}

	var user User
	err = json.Unmarshal(body, &user)
	if err != nil {
		t.Fatalf("Failed to unmarshal response body: %v", err)
	}

	// verify response body
	Users = getUsers()
	expectedUser := User{
		ID:   len(Users),
		Name: "Hank",
	}
	if user != expectedUser {
		t.Errorf("Expected user %+v but got %+v", expectedUser, user)
	}

	expectedUserCount := 4
	if len(Users) != expectedUserCount {
		t.Errorf("Expected %d users in the list but got %d", expectedUserCount, len(Users))
	}
}

//
// utility functions
//

// returns the HTTP reponse object and unmarshalled list of current users
func getUsers() []User {
	server := httptest.NewServer(router)
	defer server.Close()

	client := &http.Client{
		Transport: &http.Transport{
			Proxy: http.ProxyURL(getProxy()),
		},
	}

	resp, _ := client.Get(server.URL + "/users")
	defer resp.Body.Close()

	// parse response body
	body, _ := ioutil.ReadAll(resp.Body)

	var users []User
	json.Unmarshal(body, &users)

	return users
}

func getProxy() *url.URL {
	proxyVar := "OPTIC_PROXY"
	if _, ok := os.LookupEnv(proxyVar); !ok {
		panic("OPTIC_PROXY not set")
	}

	proxy, err := url.Parse(os.Getenv(proxyVar))
	if err != nil {
		panic(fmt.Errorf("Failed to parse proxy URL: %v", err))
	}

	return proxy
}
