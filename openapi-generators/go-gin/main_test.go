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
	users, err := getUsers()
	if err != nil {
		t.Errorf(err.Error())
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

	// the users we care about are stored in the server process, so we need to query its current state
	users, err := getUsers()
	if err != nil {
		t.Errorf(err.Error())
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
	expectedUser := User{
		ID:   len(users),
		Name: "Hank",
	}
	if user != expectedUser {
		t.Errorf("Expected user %+v but got %+v", expectedUser, user)
	}

	expectedUserCount := 4
	if len(users) != expectedUserCount {
		t.Errorf("Expected %d users in the list but got %d", expectedUserCount, len(users))
	}
}

// gets the current set of users from the server
func getUsers() ([]User, error) {
	server := httptest.NewServer(router)
	defer server.Close()

	client := &http.Client{
		Transport: &http.Transport{
			Proxy: http.ProxyURL(getProxy()),
		},
	}

	resp, err := client.Get(server.URL + "/users")
	if err != nil {
		return nil, fmt.Errorf("Failed to create request: %s", err)
	}
	defer resp.Body.Close()

	// verify status code
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("Expcted status code %d, but got %d", http.StatusOK, resp.StatusCode)
	}

	// parse response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("Failed to parse response body: %s", err)
	}

	var users []User
	err = json.Unmarshal(body, &users)
	if err != nil {
		return nil, fmt.Errorf("Failed to unmarshal response: %s", err)
	}

	return users, nil
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
