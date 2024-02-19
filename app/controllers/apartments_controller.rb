class ApartmentsController < ApplicationController
skip_before_action :authorized, only: [:index, :destroy]




    def index
        apartments = Apartment.all
        render json: apartments, include: :leases
    end

    def show 
        apartment = Apartment.find_by(id: params[:id])
        render json: apartment
    end 

    def destroy
        apartment = Apartment.find_by(id: params[:id])
        apartment.destroy
        head :no_content
    end

private

def apartment_params
 params.require(:apartment).permit(:number)
end


end
