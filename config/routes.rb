Rails.application.routes.draw do
  resources :leases
  post "/leases", to: "leases#create"
  delete "/leases/:id", to: "leases#destroy"


  resources :reviews
  get "/reviews", to: "reviews#index"
  get "/reviews/:id", to: "reviews#show"
  post "/reviews", to: "reviews#create"
  delete "/reviews/:id", to: "reviews#destroy"
  update "/reviews/:id", to: "reviews#update"


  resources :tenants


  
  resources :apartments

  get "/apartments", to: "apartments#index"
  get "/apartments/:id", to: "apartments#show"
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
