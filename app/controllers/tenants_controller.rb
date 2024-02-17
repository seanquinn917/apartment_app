class TenantsController < ApplicationController
    skip_before_action :authorized, only: [:create, :show, :index, :destroy]



def index
    tenants=Tenant.all.with_attached_image
    render json: tenants 
end

# def create
#     # byebug
#     tenant = Tenant.new(tenant_params)
#     byebug
#     if tenant.valid? && params[:image].present? && params[:image] != "null"
#         tenant.save
#         tenant.image.attach(params[:image])
#         tenant.image.attached?
#         session[:tenant_id] = tenant.id
#         render json: tenant, status: :created
#     else 
#         render json: {errors: tenant.errors.full_messages}, status: :unprocessable_entity
#     end
# end 

# def create
#     if params[:image].blank? || params[:image] == "null"
#       render json: { errors: "Image is required for creating a tenant" }, status: :unprocessable_entity
#     else
#       tenant = Tenant.new(tenant_params)
  
#       if tenant.valid?
#         tenant.image.attach(params[:image])
#         if tenant.image.attached?
#           tenant.save
#           session[:tenant_id] = tenant.id
#           render json: tenant, status: :created
#         else
#           render json: { errors: "Failed to attach image" }, status: :unprocessable_entity
#         end
#       else
#         render json: { errors: tenant.errors.full_messages }, status: :unprocessable_entity
#       end
#     end
#   end

def create
    errors = []
  
    if params[:image].blank? || params[:image].to_s == "null"
      errors << "Image is required for creating a tenant" 
    else
      tenant_params.each do |param, value|
        if value.blank?
          errors << "#{param.capitalize} can't be blank"
        end
      end
  
      if errors.empty?
        tenant = Tenant.new(tenant_params)
  
        if tenant.valid?
          tenant.image.attach(params[:image])
          if tenant.image.attached?
            tenant.save
            session[:tenant_id] = tenant.id
            render json: tenant, status: :created
            return
          else
            errors << "Failed to attach image"
          end
        else
          errors.concat(tenant.errors.full_messages)
        end
      end
    end
  
    if errors.empty?
      render json: { errors: "An unknown error occurred" }, status: :unprocessable_entity
    else
      render json: { errors: errors }, status: :unprocessable_entity
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


def destroy
    tenant = Tenant.find_by(id:params[:id])
    tenant.destroy
    head :no_content
end

def tenant_params
    params.permit(:id, :name, :age, :lease_id, :password, :password_confirmation, :username)
end

# def image_params
#     params.permit(:image)
# end

end
