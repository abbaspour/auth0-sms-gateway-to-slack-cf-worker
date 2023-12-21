locals {
  endpoint = "https://${cloudflare_worker_script.sms_gateway.name}.${var.cf_workers_subdomain}/"
  jwt_io_url_encoded= urlencode("https://jwt.io")
}

resource "cloudflare_worker_script" "sms_gateway" {
  account_id = var.cf_account_id
  name = var.cf_worker_name
  content = file("worker.js")

  plain_text_binding {
    name = "ENDPOINT"
    text = var.slack_webhook_url
  }

}

output "sms-gateway-endpoint" {
  value = local.endpoint
}