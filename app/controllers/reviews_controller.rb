class ReviewsController < ApplicationController
skip_before_action :authorized, only: [:index, :show]

def index 
    reviews = Review.all
    render json: reviews
end

def show
    review = Review.find_by(id: params[:id])
    if review 
        render json: review
    else 
        render json: {error: "review not found"}, status: :not_found
    end
end

def create
    review=Review.create!(review_params)
    if review
        render json: review
    else 
        render json: {errors: review.errors.full_messages}, status: :unprocessible_entity
    end
end


def destroy
    review=@current_tenant.reviews.find_by(id: params[:id])
    review.destroy
    head :no_content
end

def update
    review = @current_tenant.reviews.find_by(id: params[:id])
    if review
        review.update(review_params)
        render json: review, status: :accepted
    else 
        render json: {errors: "review not found"}, status: :not_found
    end
end
# def update
#     review = Review.find_by(id: params[:id])
#     if review
#       if review.update(review_params)
#         render json: review, status: :accepted
#       else
#         render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
#       end
#     else
#       render json: { errors: "Review not found" }, status: :not_found
#     end
#   end

private

def review_params
    params.require(:review).permit(:id, :tenant_id, :apartment_id, :content)
end 

end
