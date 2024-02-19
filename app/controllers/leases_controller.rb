class LeasesController < ApplicationController
skip_before_action :authorized, only: [:index]
  
    
    def index
        leases = Lease.all
        render json: leases
    end

    def show 
    lease = Lease.find_by(id: params[:id])
    render json: lease
    end

    # def destroy 
    # lease = Lease.find_by(id: params[:id])
    # lease.destroy
    # head :no_content
    # end



    private

    def lease_params
        params.require(:lease).permit(:id, :content, :rent, :apartment_id)
    end


end
