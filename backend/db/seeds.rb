admin_email = ENV["ADMIN_EMAIL"]
admin_password = ENV["ADMIN_PASSWORD"]

raise "ADMIN_EMAIL or ADMIN_PASSWORD is missing" if admin_email.blank? || admin_password.blank?

AdminUser.find_or_create_by!(email: admin_email) do |admin|
  admin.password = admin_password
end
