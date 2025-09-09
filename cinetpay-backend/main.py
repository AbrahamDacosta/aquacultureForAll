from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import time

app = FastAPI()

# Autoriser les requêtes cross-origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # à sécuriser en prod
    allow_methods=["*"],
    allow_headers=["*"],
)

class DonationRequest(BaseModel):
    amount: int
    email: str

@app.post("/create-payment")
async def create_payment(data: DonationRequest):
    transaction_id = f"TX-{int(time.time())}"

    payload = {
        "apikey": "12912847765bc0db748fdd44.40081707",
        "site_id": "5869879",
        "transaction_id": transaction_id,
        "amount": data.amount,
        "currency": "XOF",
        "description": "Donation AFA",
        "customer_email": data.email,
        "notify_url": "https://example.com/notify",
        "return_url": "https://example.com/merci.html",
        "channels": "ALL"
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api-checkout.cinetpay.com/v2/payment",
            json=payload
        )

    if response.status_code in [200, 201]:
        return response.json()
    else:
        return {"error": "Erreur lors de la création de la transaction", "details": response.text}
