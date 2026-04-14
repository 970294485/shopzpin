# Shopzpin API Documentation (Dummy Version)

## 1. Overview

This document is a **dummy / sample API specification** for **Shopzpin**, intended for internal discussion, frontend-backend alignment, partner onboarding, or proposal purposes.

It assumes Shopzpin is a merchant-focused O2O commerce and CRM platform supporting:

* merchant account management
* outlet / branch management
* membership programs
* rewards and loyalty points
* coupons and promotions
* smart ordering
* orders and payments
* customer data and analytics
* gamified campaign interactions

> **Note:** This is not an official production API specification. It is a mock document designed to illustrate how a Shopzpin-style platform API could be structured.

---

## 2. Base URL

**Sandbox**

```text
https://api-sandbox.shopzpin.com/v1
```

**Production**

```text
https://api.shopzpin.com/v1
```

---

## 3. Authentication

The API uses **Bearer Token** authentication.

### Header

```http
Authorization: Bearer <access_token>
Content-Type: application/json
```

### Login Endpoint

`POST /auth/login`

#### Request

```json
{
  "email": "merchant@brand.com",
  "password": "YourPassword123"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "Bearer",
    "expires_in": 7200,
    "merchant_id": "mrc_10001",
    "user": {
      "id": "usr_90001",
      "name": "Shop Manager",
      "role": "admin"
    }
  }
}
```

---

## 4. Standard Response Format

### Success

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Validation failed",
  "error_code": "VALIDATION_ERROR",
  "errors": {
    "email": ["The email field is required."]
  }
}
```

---

## 5. Core Resources

* Merchants
* Users / Staff
* Outlets
* Customers
* Memberships
* Loyalty Points
* Coupons
* Products / Menus
* Orders
* Payments
* Campaigns
* Game Rewards
* Analytics

---

## 6. Merchant Endpoints

### 6.1 Get Merchant Profile

`GET /merchant/profile`

#### Response

```json
{
  "success": true,
  "data": {
    "merchant_id": "mrc_10001",
    "brand_name": "Demo Cafe",
    "business_type": "F&B",
    "email": "merchant@brand.com",
    "phone": "+60-12-3456789",
    "status": "active",
    "created_at": "2026-04-14T10:00:00Z"
  }
}
```

### 6.2 Update Merchant Profile

`PUT /merchant/profile`

#### Request

```json
{
  "brand_name": "Demo Cafe Group",
  "phone": "+60-12-8888888",
  "business_type": "Retail & F&B"
}
```

---

## 7. Staff / User Management

### 7.1 List Staff

`GET /staff`

#### Query Parameters

* `page`
* `limit`
* `role`

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "usr_90001",
      "name": "Amy Lee",
      "email": "amy@brand.com",
      "role": "admin",
      "status": "active"
    },
    {
      "id": "usr_90002",
      "name": "John Tan",
      "email": "john@brand.com",
      "role": "branch_manager",
      "status": "active"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 2
  }
}
```

### 7.2 Create Staff

`POST /staff`

#### Request

```json
{
  "name": "Alice Wong",
  "email": "alice@brand.com",
  "role": "cashier",
  "outlet_id": "out_101"
}
```

---

## 8. Outlet Management

### 8.1 List Outlets

`GET /outlets`

### 8.2 Create Outlet

`POST /outlets`

#### Request

```json
{
  "name": "Demo Cafe - Puchong",
  "code": "PCH001",
  "address": "72-1A Jalan Puteri 2/4, Bandar Puteri, Puchong",
  "phone": "+60-16-9642896",
  "status": "active"
}
```

### 8.3 Get Outlet Details

`GET /outlets/{outlet_id}`

### 8.4 Update Outlet

`PUT /outlets/{outlet_id}`

### 8.5 Delete Outlet

`DELETE /outlets/{outlet_id}`

---

## 9. Customer Management

### 9.1 List Customers

`GET /customers`

#### Query Parameters

* `page`
* `limit`
* `keyword`
* `membership_tier`
* `outlet_id`

### 9.2 Create Customer

`POST /customers`

#### Request

```json
{
  "name": "Carter Yip",
  "phone": "+852-90000000",
  "email": "carter@example.com",
  "birth_date": "1990-01-01",
  "source": "qr_signup"
}
```

### 9.3 Get Customer Details

`GET /customers/{customer_id}`

#### Response

```json
{
  "success": true,
  "data": {
    "id": "cus_20001",
    "name": "Carter Yip",
    "phone": "+852-90000000",
    "email": "carter@example.com",
    "membership_tier": "Gold",
    "points_balance": 580,
    "total_spent": 2450.00,
    "last_visit_at": "2026-04-13T14:22:10Z"
  }
}
```

---

## 10. Membership & Loyalty

### 10.1 List Membership Tiers

`GET /memberships/tiers`

#### Response

```json
{
  "success": true,
  "data": [
    {
      "id": "tier_bronze",
      "name": "Bronze",
      "min_spend": 0,
      "benefits": ["Welcome reward"]
    },
    {
      "id": "tier_silver",
      "name": "Silver",
      "min_spend": 1000,
      "benefits": ["Birthday voucher", "Priority promo"]
    },
    {
      "id": "tier_gold",
      "name": "Gold",
      "min_spend": 2000,
      "benefits": ["Extra points", "Exclusive offers"]
    }
  ]
}
```

### 10.2 Add Loyalty Points

`POST /customers/{customer_id}/points/add`

#### Request

```json
{
  "points": 100,
  "reason": "Purchase reward",
  "reference_no": "ord_50001"
}
```

### 10.3 Redeem Loyalty Points

`POST /customers/{customer_id}/points/redeem`

#### Request

```json
{
  "points": 200,
  "reward_id": "rw_001"
}
```

### 10.4 View Points Ledger

`GET /customers/{customer_id}/points/ledger`

---

## 11. Coupons & Promotions

### 11.1 List Coupons

`GET /coupons`

### 11.2 Create Coupon

`POST /coupons`

#### Request

```json
{
  "title": "10% OFF Lunch Promo",
  "code": "LUNCH10",
  "discount_type": "percentage",
  "discount_value": 10,
  "valid_from": "2026-04-15T00:00:00Z",
  "valid_to": "2026-05-15T23:59:59Z",
  "usage_limit": 500,
  "applicable_outlet_ids": ["out_101", "out_102"]
}
```

### 11.3 Validate Coupon

`POST /coupons/validate`

#### Request

```json
{
  "code": "LUNCH10",
  "customer_id": "cus_20001",
  "cart_total": 120.00
}
```

### 11.4 Disable Coupon

`PATCH /coupons/{coupon_id}/disable`

---

## 12. Product / Menu Management

### 12.1 List Products

`GET /products`

### 12.2 Create Product

`POST /products`

#### Request

```json
{
  "name": "Iced Latte",
  "sku": "DRINK-001",
  "category": "Beverage",
  "price": 14.90,
  "status": "active",
  "outlet_ids": ["out_101"]
}
```

### 12.3 Update Product

`PUT /products/{product_id}`

### 12.4 Delete Product

`DELETE /products/{product_id}`

---

## 13. Smart Order / Orders

### 13.1 Create Order

`POST /orders`

#### Request

```json
{
  "customer_id": "cus_20001",
  "outlet_id": "out_101",
  "order_type": "pickup",
  "items": [
    {
      "product_id": "prd_101",
      "name": "Iced Latte",
      "qty": 2,
      "unit_price": 14.90
    }
  ],
  "coupon_code": "LUNCH10",
  "notes": "Less sugar"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "order_id": "ord_50001",
    "status": "pending_payment",
    "subtotal": 29.80,
    "discount": 2.98,
    "total": 26.82,
    "currency": "MYR"
  }
}
```

### 13.2 Get Order Details

`GET /orders/{order_id}`

### 13.3 List Orders

`GET /orders`

#### Query Parameters

* `status`
* `outlet_id`
* `customer_id`
* `date_from`
* `date_to`

### 13.4 Update Order Status

`PATCH /orders/{order_id}/status`

#### Request

```json
{
  "status": "completed"
}
```

---

## 14. Payments

### 14.1 Create Payment Intent

`POST /payments/intents`

#### Request

```json
{
  "order_id": "ord_50001",
  "method": "fpx",
  "amount": 26.82,
  "currency": "MYR"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "payment_intent_id": "pay_30001",
    "status": "requires_action",
    "payment_url": "https://pay.shopzpin.com/checkout/pay_30001"
  }
}
```

### 14.2 Verify Payment

`POST /payments/verify`

#### Request

```json
{
  "payment_intent_id": "pay_30001",
  "gateway_reference": "GX99887766"
}
```

### 14.3 Payment History

`GET /payments`

---

## 15. Gamified Campaign API

### 15.1 List Campaigns

`GET /campaigns`

### 15.2 Create Campaign

`POST /campaigns`

#### Request

```json
{
  "title": "Spin & Win April",
  "campaign_type": "game_reward",
  "game_type": "spin_wheel",
  "start_at": "2026-04-15T00:00:00Z",
  "end_at": "2026-04-30T23:59:59Z",
  "outlet_ids": ["out_101"],
  "rules": {
    "daily_play_limit": 1,
    "min_purchase": 20
  }
}
```

### 15.3 Start Game Session

`POST /campaigns/{campaign_id}/play`

#### Request

```json
{
  "customer_id": "cus_20001",
  "source": "qr_code"
}
```

### 15.4 Claim Reward

`POST /campaigns/{campaign_id}/claim`

#### Request

```json
{
  "customer_id": "cus_20001",
  "reward_code": "RWAPRIL88"
}
```

---

## 16. Analytics

### 16.1 Sales Summary

`GET /analytics/sales-summary`

#### Query Parameters

* `date_from`
* `date_to`
* `outlet_id`

#### Response

```json
{
  "success": true,
  "data": {
    "gross_sales": 18500.00,
    "net_sales": 17220.00,
    "total_orders": 632,
    "average_order_value": 27.25,
    "new_customers": 87,
    "repeat_customers": 214
  }
}
```

### 16.2 Customer Insights

`GET /analytics/customers`

### 16.3 Campaign Performance

`GET /analytics/campaigns/{campaign_id}`

---

## 17. Webhooks

Shopzpin can send webhook events to external systems.

### Supported Events

* `order.created`
* `order.completed`
* `payment.success`
* `payment.failed`
* `customer.created`
* `coupon.redeemed`
* `campaign.reward_claimed`

### Example Webhook Payload

```json
{
  "event": "payment.success",
  "created_at": "2026-04-14T11:30:00Z",
  "data": {
    "payment_intent_id": "pay_30001",
    "order_id": "ord_50001",
    "amount": 26.82,
    "currency": "MYR",
    "status": "success"
  }
}
```

---

## 18. Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 422  | Validation Error      |
| 429  | Too Many Requests     |
| 500  | Internal Server Error |

---

## 19. Rate Limits

Default API rate limit:

* `100 requests / minute / token`

When rate limit is exceeded:

```json
{
  "success": false,
  "message": "Too many requests",
  "error_code": "RATE_LIMIT_EXCEEDED"
}
```

---

## 20. Example End-to-End Flow

### Scenario: Customer scans QR code, signs up, places order, earns reward

1. Customer signs up

   * `POST /customers`
2. Merchant app retrieves customer profile

   * `GET /customers/{customer_id}`
3. Customer places order

   * `POST /orders`
4. Customer pays

   * `POST /payments/intents`
   * `POST /payments/verify`
5. System marks order as completed

   * `PATCH /orders/{order_id}/status`
6. System adds points to customer wallet

   * `POST /customers/{customer_id}/points/add`
7. Customer joins campaign and claims reward

   * `POST /campaigns/{campaign_id}/play`
   * `POST /campaigns/{campaign_id}/claim`

---

## 21. Security Recommendations

* Use HTTPS only
* Rotate API keys regularly
* Implement role-based access control for merchant staff
* Log all admin-sensitive actions
* Validate webhook signatures
* Apply IP allowlisting for enterprise merchants when needed

---

## 22. Dummy Error Codes

| Error Code               | Description               |
| ------------------------ | ------------------------- |
| AUTH_INVALID_CREDENTIALS | Invalid login credentials |
| AUTH_TOKEN_EXPIRED       | Token expired             |
| VALIDATION_ERROR         | Request validation failed |
| CUSTOMER_NOT_FOUND       | Customer record not found |
| OUTLET_NOT_FOUND         | Outlet record not found   |
| COUPON_INVALID           | Coupon is invalid         |
| COUPON_EXPIRED           | Coupon has expired        |
| ORDER_NOT_FOUND          | Order not found           |
| PAYMENT_FAILED           | Payment failed            |
| CAMPAIGN_NOT_ACTIVE      | Campaign is not active    |
| RATE_LIMIT_EXCEEDED      | Too many requests         |

---

## 23. Versioning

The API is versioned in the URL:

```text
/v1
```

Future breaking changes will be released under:

```text
/v2
```

---

## 24. Final Note

This dummy API document is suitable for:

* pitch deck appendix
* internal system planning
* developer briefing
* client proposal
* prototype integration planning

If needed, this can be expanded into:

1. **Swagger / OpenAPI format**
2. **Postman collection format**
3. **Partner API version**
4. **Merchant app + consumer app separated API doc**
5. **More enterprise-style document with authentication, RBAC, and webhook signing details**
