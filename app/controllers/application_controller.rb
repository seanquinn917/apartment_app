class ApplicationController < ActionController::Base
    include ActionController::Cookies
    before_action :authorized
  
  
   
    def authorized
      return render json: { error: "Not Authorized" }, status: :unauthorized unless session.include?(:tenant_id)
      puts session[:tenant_id]
      @current_tenant = Tenant.find_by(id: session[:tenant_id])
  
      return render json: { error: "Not Authorized" }, status: :unauthorized unless @current_user
    end
    
    def current_user
      @current_user
    end
  
end
