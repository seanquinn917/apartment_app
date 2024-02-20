class AdminController < ApplicationController
    before_action :authorized_admin

    def authorized_admin
        @current_tenant = Tenant.find_by(id: session[:tenant_id])
        return render json: { error: "Not Authorized" }, status: :unauthorized unless @current_tenant&.admin?
    end
      
      def current_tenant
        @current_tenant
      end


      
    def create_apartment
        apartment = Apartment.create(apartment_params)
        if apartment.valid?
            render json: apartment, status: :created
        else 
            render json: {errors: apartment.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy_apartment
        apartment=Apartment.find_by(id: params[:id])
        if apartment
            apartment.destroy
            head :no_content
        else
            render json: {error: "Apartment Not Found"}, status: :not_found
        end
    end

    
    def create_lease
        lease = Lease.create(lease_params)
        if lease.valid?
            render json: lease, status: :created
        else 
            render json: {errors: [lease.errors.full_messages]}, status: :unprocessable_entity
        end
    end

    def destroy_lease 
        lease = Lease.find_by(id: params[:id])
        if lease
            lease.destroy
            head :no_content
        else
            render json: {error: "Lease not Found"}, status: :not_found
        end
    end

    
    def destroy_tenant
        tenant = Tenant.find_by(id:params[:id])
        tenant.destroy
        head :no_content
    end
    

    private

    def lease_params
         params.permit(:content, :rent, :apartment_id)
    end

    def apartment_params
        params.permit(:number)
    end


           
    
end
