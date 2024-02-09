class ApplicationController < ActionController::API
    include ActionController::Cookies
    before_action :authorized
  
  
   
    def authorized
      return render json: { error: "Not Authorized" }, status: :unauthorized unless session.include?(:tenant_id)
      puts session[:tenant_id]
      @current_tenant = Tenant.find_by(id: session[:tenant_id])
      puts @current_tenant
      return render json: { error: "Not Authorized" }, status: :unauthorized unless @current_tenant
    end
    
    def current_tenant
      @current_tenant
    end
  
end
