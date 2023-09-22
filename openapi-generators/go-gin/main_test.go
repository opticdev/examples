package main

import (
	// "bytes"
	// "encoding/json"
	"net/http"
	"net/http/httptest"
	"net/url"
	// "reflect"
	"testing"
)

func TestRoot(t *testing.T) {
	// Define the URL of your external reverse proxy.
	proxyURL, err := url.Parse("http://localhost:8000")
	if err != nil {
		t.Fatalf("Failed to parse proxy URL: %v", err)
	}

	client := &http.Client{
		Transport: &http.Transport{
			Proxy: http.ProxyURL(proxyURL),
		},
	}

	router := setupRouter()

	server := httptest.NewServer(router)
	defer server.Close()

	// Make a test request through the proxy using the custom client.
	// Replace "server.URL" with the actual URL you want to test.
	resp, err := client.Get(server.URL + "/")
	if err != nil {
		t.Fatalf("Request failed: %v", err)
	}
	defer resp.Body.Close()

	// Handle the response as needed in your test.
	// For example, check the response status code or body.
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status code %d, but got %d", http.StatusOK, resp.StatusCode)
	}
}

// func TestUsers(t *testing.T) {
// 	req, err := http.NewRequest(http.MethodGet, "/users", nil)
// 	if err != nil {
// 		t.Fatalf("Failed to create request: %v", err)
// 	}

// 	rec := httptest.NewRecorder()

// 	// serve the request
// 	setupRouter().ServeHTTP(rec, req)

// 	if rec.Code != http.StatusOK {
// 		t.Errorf("Expected status code %d but got %d", http.StatusOK, rec.Code)
// 	}

// 	var users []User
// 	err = json.Unmarshal(rec.Body.Bytes(), &users)
// 	if err != nil {
// 		t.Fatalf("Failed to unmarshal response body: %v", err)
// 	}

// 	if !reflect.DeepEqual(Users, users) {
// 		t.Errorf("Expected response %v but got %v", Users, users)
// 	}
// }

// func TestCreateUser(t *testing.T) {
// 	payload := map[string]string{
// 		"name": "Hank",
// 	}
// 	payloadBytes, _ := json.Marshal(payload)

// 	req, err := http.NewRequest(http.MethodPost, "/users/create", bytes.NewReader(payloadBytes))
// 	if err != nil {
// 		t.Fatalf("Failed to create request: %v", err)
// 	}

// 	rec := httptest.NewRecorder()

// 	// serve the request
// 	setupRouter().ServeHTTP(rec, req)

// 	if rec.Code != http.StatusCreated {
// 		t.Errorf("Expected status code %d but got %d", http.StatusCreated, rec.Code)
// 	}

// 	var user User
// 	err = json.Unmarshal(rec.Body.Bytes(), &user)
// 	if err != nil {
// 		t.Fatalf("Failed to unmarshal response body: %v", err)
// 	}

// 	expectedUser := User{
// 		ID:   len(Users),
// 		Name: "Hank",
// 	}
// 	if user != expectedUser {
// 		t.Errorf("Expected user %+v but got %+v", expectedUser, user)
// 	}

// 	lastUser := Users[len(Users)-1]
// 	if len(Users) != lastUser.ID {
// 		t.Errorf("Expected %d users in the list but got %d", lastUser.ID, len(Users))
// 	}
// }
