class TenantsController < ApplicationController

def create
    tenant = Tenant.create!(tenant_params)
    render json: tenant, status: :created
end

def show
    tenant = Tenant.find_by(id: params[:id])
    if tenant
        render json: tenant
    else
        render json: {error: "tenant not found"}, status: :not_found
    end
end

def tenant_params
    params.permit(:id, :name, :age, :lease_id)
end


end
