Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
     origins(
      ENV["FRONTEND_URL"],
      ENV["LOCAL_FRONTEND_URL"]
    ).compact
    
    resource "*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ],
      credentials: true
  end
end
