package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
)

func TestRoot(t *testing.T) {
	req, err := http.NewRequest(http.MethodGet, "/", nil)
	if err != nil {
		t.Fatalf("Failed to create request: %v", err)
	}

	rec := httptest.NewRecorder()

	// serve the request
	setupRouter().ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, rec.Code)
	}

	var responseBody map[string]string
	err = json.Unmarshal(rec.Body.Bytes(), &responseBody)
	if err != nil {
		t.Fatalf("Failed to unmarshal response body: %v", err)
	}

	expectedResponse := map[string]string{"message": "Hello, world!"}
	if !reflect.DeepEqual(expectedResponse, responseBody) {
		t.Errorf("Expected response %v but got %v", expectedResponse, responseBody)
	}
}

func TestUsers(t *testing.T) {
	req, err := http.NewRequest(http.MethodGet, "/users", nil)
	if err != nil {
		t.Fatalf("Failed to create request: %v", err)
	}

	rec := httptest.NewRecorder()

	// serve the request
	setupRouter().ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Errorf("Expected status code %d but got %d", http.StatusOK, rec.Code)
	}

	var users []User
	err = json.Unmarshal(rec.Body.Bytes(), &users)
	if err != nil {
		t.Fatalf("Failed to unmarshal response body: %v", err)
	}

	if !reflect.DeepEqual(Users, users) {
		t.Errorf("Expected response %v but got %v", Users, users)
	}
}

func TestCreateUser(t *testing.T) {
	payload := map[string]string{
		"name": "Hank",
	}
	payloadBytes, _ := json.Marshal(payload)

	req, err := http.NewRequest(http.MethodPost, "/users/create", bytes.NewReader(payloadBytes))
	if err != nil {
		t.Fatalf("Failed to create request: %v", err)
	}

	rec := httptest.NewRecorder()

	// serve the request
	setupRouter().ServeHTTP(rec, req)

	if rec.Code != http.StatusCreated {
		t.Errorf("Expected status code %d but got %d", http.StatusCreated, rec.Code)
	}

	var user User
	err = json.Unmarshal(rec.Body.Bytes(), &user)
	if err != nil {
		t.Fatalf("Failed to unmarshal response body: %v", err)
	}

	expectedUser := User{
		ID:   len(Users),
		Name: "Hank",
	}
	if user != expectedUser {
		t.Errorf("Expected user %+v but got %+v", expectedUser, user)
	}

	lastUser := Users[len(Users)-1]
	if len(Users) != lastUser.ID {
		t.Errorf("Expected %d users in the list but got %d", lastUser.ID, len(Users))
	}
}
