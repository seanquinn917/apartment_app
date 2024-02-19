class ApartmentsController < ApplicationController
skip_before_action :authorized, only: [:index]




    def index
        apartments = Apartment.all
        render json: apartments, include: :leases
    end

    def show 
        apartment = Apartment.find_by(id: params[:id])
        render json: apartment
    end 

    

private

def apartment_params
 params.require(:apartment).permit(:number)
end


end
