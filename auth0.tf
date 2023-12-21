resource "auth0_connection" "sms" {
  name     = "sms"
  strategy = "sms"

  options {
    disable_signup         = false
    name                   = "sms"
    from                   = "+15555555555"
    syntax                 = "md_with_macros"
    template               = "Your one-time password is @@password@@"
    brute_force_protection = true
    provider               = "sms_gateway"
    gateway_url            = local.endpoint
    forward_request_info   = true

    totp {
      time_step = 300
      length    = 6
    }
  }
}
