class SessionsController < ApplicationController
skip_before_action :authorized, only: [:create, :get_current_tenant, :destroy]


    def create
        tenant = Tenant.find_by(username: params[:username])
        if tenant && tenant.authenticate(params[:password])
            session[:tenant_id]=tenant.id
            puts session[:tenant_id]
            render json: tenant, status: :ok
        else
            render json: {error:["Invalid Username or Password"]}, status: :unauthorized
        end
    end

    # def destroy
    #     tenant=Tenant.find_by(id: session[:tenant_id])
    #     if tenant
    #         session.delete :tenant_id
    #         head :no_content
    #     else 
    #         render json: {errors: ["Unauthorized"]}, status: :unauthorized
    #     end
    # end

    def destroy 
        tenant=Tenant.find_by(id: session[:tenant_id])
            if tenant
                session.clear
                response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
                response.headers["Pragma"] = "no-cache"
                response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
                redirect_to "/login"
            else
                render json: {errors: ["Unauthorized"]}, status: :unauthorized
            end 
    end 

    def get_current_tenant
        tenant= Tenant.find_by(id: session[:tenant_id])
        render json: tenant, status: :ok
    end


private

def session_params
    params.require(:session).permit(:username, :password)
end

end
