class LeasesController < ApplicationController
    

    def show 
    lease = Lease.find_by(id: params[:id])
    render json: lease
    end

    def create 
    lease = Lease.create!(lease_params)
    render json: lease, status: :created
    end

    def destroy 
    lease = Lease.find_by(id: params[:id])
    lease.destroy
    head :no_content
    end



    private

    def lease_params
        params.permit(:id, :content, :rent, :tenant_id, :apartment_id)
    end


end
