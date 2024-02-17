class ApartmentsController < ApplicationController
skip_before_action :authorized, only: [:index, :create, :destroy]


    def create
        apartment = Apartment.create!(apartment_params)
        if apartment.valid?
            render json: apartment, status: :created
        else 
            render json: {errors: apartment.errors.full_messages}, status: :unprocessable_entity
        end
    end


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
