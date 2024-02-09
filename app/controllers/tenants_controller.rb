class TenantsController < ApplicationController
    skip_before_action :authorized, only: [:create, :show, :index]



def index
    tenants=Tenant.all.with_attached_image
    render json: tenants 
end

def create
    tenant = Tenant.create(tenant_params)
    if tenant.save
        puts "Params image: #{params[:image]}"
        tenant.image.attach(params[:image])
        tenant.image.attached?
        session[:tenant_id] = tenant.id
        render json: tenant, status: :created
    else 
        render json: {errors: tenant.errors.full_messages}, status: :unprocessable_entity
    end
end 

def show
    if session[:tenant_id]
        tenant = Tenant.find_by(id: session[:tenant_id])
        render json: tenant, status: :ok
        puts session[:tenant_id]
    else
        render json: {errors: "tenant not found"}, status: :not_found
    end
end

def tenant_params
    params.permit(:id, :name, :age, :lease_id, :password, :password_confirmation, :username, :image)
end


end
