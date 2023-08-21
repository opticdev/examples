require 'json'
require 'sinatra'

users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' },
]

get '/' do
  content_type :json
  [msg: 'Hello, World!'].to_json
end

get '/users' do
  content_type :json
  users.to_json
end

post '/users/create' do
  content_type :json
  new_user = JSON.parse(request.body.read)
  new_user_id = users.empty? ? 1 : users.last[:id] + 1
  users << { id: new_user_id, name: new_user['name'] }
  { id: new_user_id, name: new_user['name'] }.to_json
end