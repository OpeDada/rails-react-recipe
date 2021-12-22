Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/recipes', to: 'recipes#index'
      post '/recipes', to: 'recipes#create'
      get '/recipes/:id', to: 'recipes#show'
      patch '/recipes/:id', to: 'recipes#update'
      delete '/recipes/:id', to: 'recipes#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
