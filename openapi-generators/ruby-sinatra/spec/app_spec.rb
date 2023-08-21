require_relative '../app'
require 'rack/test'
require 'rspec/openapi'

RSpec.describe 'App', type: :request do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  describe 'GET /' do
    it 'returns a successful response' do
      get '/'
      expect(last_response.status).to eq(200)
    end

    it 'returns the expected message' do
      get '/'
      expect(last_response.body).to include('Hello, World!')
    end

    it 'returns JSON content type' do
      get '/'
      expect(last_response.headers['Content-Type']).to include('application/json')
    end
  end

  describe 'GET /users' do
    it 'gets all users' do
      get '/users'
      expect(last_response.status).to eq(200)
    end
  end

  describe 'POST /users/create' do
    it 'creates a new user' do
      payload = { name: 'New User' }.to_json

      post '/users/create', payload, { 'CONTENT_TYPE' => 'application/json' }

      expect(last_response).to be_ok
      expect(last_response.headers['Content-Type']).to include('application/json')

      response_data = JSON.parse(last_response.body)

      expect(response_data['id']).to be_a(Integer)
      expect(response_data['name']).to eq('New User')
    end
  end
end