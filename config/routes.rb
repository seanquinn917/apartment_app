Rails.application.routes.draw do



  resources :leases, except: [:create, :destroy]
  post '/leases', to: 'admin#create_lease', as: 'admin_create_lease'
  delete "/leases/:id", to: "admin#destroy_lease", as: 'admin_destroy_lease'
  get "/leases", to: "leases#index"
  get "/lease/:id", to: "leases#show"

  resources :reviews
  get "/reviews", to: "reviews#index"
  get "/reviews/:id", to: "reviews#show"
  post "/reviews", to: "reviews#create"
  delete "/reviews/:id", to: "reviews#destroy"
  patch "/reviews/:id", to: "reviews#update"


  resources :tenants, except: [:destroy]
  delete '/tenants/:id', to: "admin#destroy_tenant", as: 'admin_destroy_tenant'
  post "/signup", to: "tenants#create"
  get "/tenants/:id", to: "tenants#show"
  get "/me", to: "tenants#show"
  get "/tenants", to: "tenants#index"
  
  
  
  resources :apartments, except: [:create, :destroy]
  post '/apartments', to: 'admin#create_apartment', as: 'admin_create_apartment'
  delete '/apartments/:id', to: 'admin#destroy_apartment', as:'admin_destroy_apartment'
  get "/apartments", to: "apartments#index"
  get "/apartments/:id", to: "apartments#show"
  
  #  scope '/admin' do
    
    
  #  end
 
  
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
