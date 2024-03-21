class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token

    private
  
    # Redirect to login page (new_user_session_path by default) if user is not authenticated
    def after_sign_out_path_for(resource_or_scope)
        new_user_session_path # Default path, change if you have a custom sign-in route
    end

end
