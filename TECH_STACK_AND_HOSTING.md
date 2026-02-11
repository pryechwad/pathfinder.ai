# PathFinder AI - Tech Stack & Hosting Documentation

## Technology Stack Overview

### Frontend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.0 | UI library for building interactive interfaces |
| Vite | Latest | Fast build tool and development server |
| React Router DOM | Latest | Client-side routing and navigation |
| Tailwind CSS | Latest | Utility-first CSS framework for styling |
| Lucide React | Latest | Icon library for UI components |
| Axios | Latest | HTTP client for API requests |

### Backend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | JavaScript runtime environment |
| Express | 5.2.1 | Web application framework |
| Prisma | 7.3.0 | Next-generation ORM for database |
| PostgreSQL | 14+ | Relational database management |
| JWT | Latest | Authentication and authorization |
| Bcrypt | Latest | Password hashing and security |

### Development Tools
| Tool | Purpose |
|------|---------|
| Nodemon | Auto-reload development server |
| ESLint | Code linting and quality checks |
| Git | Version control system |

---

## Hosting Platform Options

### Option 1: Google Cloud Platform (GCP) - Recommended for Startups
**Best for:** Scalability, reliability, and startup credits

#### Services Used:
- **Frontend:** Cloud Storage + Cloud CDN
- **Backend:** Cloud Run or App Engine
- **Database:** Cloud SQL (PostgreSQL)
- **Storage:** Cloud Storage for media files

#### Advantages:
- $300 free credits for 90 days
- Google for Startups program (up to $100,000 credits)
- Auto-scaling capabilities
- 99.95% uptime SLA
- Global CDN network

---

### Option 2: Hostinger VPS
**Best for:** Budget-conscious startups

#### Services Used:
- **VPS Plan:** Business or Enterprise VPS
- **Database:** Self-hosted PostgreSQL
- **CDN:** Cloudflare (free tier)

#### Advantages:
- Lower initial costs
- Full server control
- Predictable pricing
- Easy to set up

---

### Option 3: AWS (Amazon Web Services)
**Best for:** Enterprise-grade infrastructure

#### Services Used:
- **Frontend:** S3 + CloudFront
- **Backend:** EC2 or Elastic Beanstalk
- **Database:** RDS PostgreSQL
- **Storage:** S3

---

## Cost Estimation for 10,000 Users

### Assumptions:
- 10,000 registered users
- 2,500 daily active users (25% DAU)
- Average 10 API requests per user per day
- 25,000 total API requests/day
- 50 GB database storage
- 100 GB media/file storage
- 250 GB monthly bandwidth

---

## Cost Estimation for 20,000 Users

### Assumptions:
- 20,000 registered users
- 5,000 daily active users (25% DAU)
- Average 10 API requests per user per day
- 50,000 total API requests/day
- 100 GB database storage
- 200 GB media/file storage
- 500 GB monthly bandwidth

---

## Detailed Cost Breakdown

---

# FOR 10,000 USERS

### 1. Google Cloud Platform (GCP) - RECOMMENDED

#### Monthly Costs:

**Frontend Hosting (Cloud Storage + CDN)**
- Cloud Storage: 100 GB × $0.020/GB = $2.00
- Cloud CDN: 250 GB × $0.08/GB = $20.00
- **Subtotal: $22.00/month**

**Backend Hosting (Cloud Run)**
- CPU: 1 vCPU × 730 hours × $0.00002400 = $17.52
- Memory: 2 GB × 730 hours × $0.00000250 = $3.65
- Requests: 25,000/day × 30 = 750K requests × $0.40/million = $0.30
- **Subtotal: $21.47/month**

**Database (Cloud SQL - PostgreSQL)**
- db-n1-standard-1 (1 vCPU, 3.75 GB RAM)
- Instance: $48.55/month
- Storage: 50 GB SSD × $0.17/GB = $8.50
- Backup: 50 GB × $0.08/GB = $4.00
- **Subtotal: $61.05/month**

**Additional Services**
- Cloud Load Balancing: $18.00/month
- Cloud Monitoring: $5.00/month
- SSL Certificates: Free (Google-managed)
- **Subtotal: $23.00/month**

**GCP Total: $127.52/month (~₹10,627/month)**

**With Google for Startups Credits:**
- First year: FREE (covered by credits)
- Effective cost after credits: $0/month for 12-18 months

---

### 2. Hostinger VPS

#### Monthly Costs:

**VPS Standard Plan**
- 4 vCPU cores
- 8 GB RAM
- 200 GB NVMe storage
- 4 TB bandwidth
- **Cost: $19.99/month (~₹1,666/month)**

**Additional Services**
- Domain: $12.99/year (~₹1,082/year or ₹90/month)
- SSL Certificate: Free (Let's Encrypt)
- Cloudflare CDN: Free tier
- Backup: $2.99/month (~₹249/month)
- **Subtotal: $23.98/month (~₹1,998/month)**

**Hostinger Total: $23.98/month (~₹1,998/month)**

---

### 3. AWS (Amazon Web Services)

#### Monthly Costs:

**Frontend (S3 + CloudFront)**
- S3 Storage: 100 GB × $0.023/GB = $2.30
- S3 Requests: Minimal (~$0.50)
- CloudFront: 250 GB × $0.085/GB = $21.25
- **Subtotal: $24.05/month**

**Backend (EC2 t3.small)**
- Instance: t3.small (2 vCPU, 2 GB) = $15.18/month
- EBS Storage: 30 GB × $0.10/GB = $3.00
- Data Transfer: 250 GB × $0.09/GB = $22.50
- **Subtotal: $40.68/month**

**Database (RDS PostgreSQL)**
- db.t3.small (2 vCPU, 2 GB RAM) = $30.84/month
- Storage: 50 GB × $0.115/GB = $5.75
- Backup: 50 GB × $0.095/GB = $4.75
- **Subtotal: $41.34/month**

**Additional Services**
- Elastic Load Balancer: $16.20/month
- Route 53 (DNS): $0.50/month
- **Subtotal: $16.70/month**

**AWS Total: $122.77/month (~₹10,231/month)**

---

# FOR 20,000 USERS

### 1. Google Cloud Platform (GCP) - RECOMMENDED

#### Monthly Costs:

**Frontend Hosting (Cloud Storage + CDN)**
- Cloud Storage: 200 GB × $0.020/GB = $4.00
- Cloud CDN: 500 GB × $0.08/GB = $40.00
- **Subtotal: $44.00/month**

**Backend Hosting (Cloud Run)**
- CPU: 2 vCPU × 730 hours × $0.00002400 = $35.04
- Memory: 4 GB × 730 hours × $0.00000250 = $7.30
- Requests: 50,000/day × 30 = 1.5M requests × $0.40/million = $0.60
- **Subtotal: $42.94/month**

**Database (Cloud SQL - PostgreSQL)**
- db-n1-standard-2 (2 vCPU, 7.5 GB RAM)
- Instance: $97.09/month
- Storage: 100 GB SSD × $0.17/GB = $17.00
- Backup: 100 GB × $0.08/GB = $8.00
- **Subtotal: $122.09/month**

**Additional Services**
- Cloud Load Balancing: $18.00/month
- Cloud Monitoring: $10.00/month
- SSL Certificates: Free (Google-managed)
- **Subtotal: $28.00/month**

**GCP Total: $237.03/month (~₹19,762/month)**

### 2. Hostinger VPS

#### Monthly Costs:

**VPS Business Plan**
- 8 vCPU cores
- 16 GB RAM
- 400 GB NVMe storage
- 8 TB bandwidth
- **Cost: $29.99/month (~₹2,499/month)**

**Additional Services**
- Domain: $12.99/year (~₹1,082/year or ₹90/month)
- SSL Certificate: Free (Let's Encrypt)
- Cloudflare CDN: Free tier
- Backup: $3.99/month (~₹332/month)
- **Subtotal: $33.98/month (~₹2,831/month)**

**Hostinger Total: $33.98/month (~₹2,831/month)**

### 3. AWS (Amazon Web Services)

#### Monthly Costs:

**Frontend (S3 + CloudFront)**
- S3 Storage: 200 GB × $0.023/GB = $4.60
- S3 Requests: Minimal (~$1.00)
- CloudFront: 500 GB × $0.085/GB = $42.50
- **Subtotal: $48.10/month**

**Backend (EC2 t3.medium)**
- Instance: t3.medium (2 vCPU, 4 GB) = $30.37/month
- EBS Storage: 50 GB × $0.10/GB = $5.00
- Data Transfer: 500 GB × $0.09/GB = $45.00
- **Subtotal: $80.37/month**

**Database (RDS PostgreSQL)**
- db.t3.medium (2 vCPU, 4 GB RAM) = $61.68/month
- Storage: 100 GB × $0.115/GB = $11.50
- Backup: 100 GB × $0.095/GB = $9.50
- **Subtotal: $82.68/month**

**Additional Services**
- Elastic Load Balancer: $16.20/month
- Route 53 (DNS): $0.50/month
- **Subtotal: $16.70/month**

**AWS Total: $227.85/month (~₹18,994/month)**

---

## Cost Comparison Summary

### For 10,000 Users:

| Platform | Monthly Cost (USD) | Monthly Cost (INR) | First Year Cost | Best For |
|----------|-------------------|-------------------|-----------------|----------|
| **GCP** | $127.52 | ₹10,627 | **FREE** (with credits) | Startups with growth plans |
| **Hostinger** | $23.98 | ₹1,998 | ₹23,976 | Budget-conscious startups |
| **AWS** | $122.77 | ₹10,231 | ₹1,22,772 | Enterprise applications |

### For 20,000 Users:

| Platform | Monthly Cost (USD) | Monthly Cost (INR) | First Year Cost | Best For |
|----------|-------------------|-------------------|-----------------|----------|
| **GCP** | $237.03 | ₹19,762 | **FREE** (with credits) | Startups with growth plans |
| **Hostinger** | $33.98 | ₹2,831 | ₹33,972 | Budget-conscious startups |
| **AWS** | $227.85 | ₹18,994 | ₹2,27,928 | Enterprise applications |

*Exchange rate: 1 USD = 83.33 INR*

---

## Recommended Hosting Strategy

### Phase 1: Launch (0-5,000 users)
**Platform:** Hostinger VPS Standard
- **Cost:** ₹1,998/month
- **Why:** Low initial investment, sufficient resources
- **Duration:** 3-6 months

### Phase 2: Growth (5,000-10,000 users)
**Platform:** Google Cloud Platform
- **Cost:** FREE (with startup credits)
- **Why:** Better scalability, reliability, and performance
- **Duration:** 6-12 months (credit period)

### Phase 3: Scale (10,000-20,000 users)
**Platform:** GCP (optimized)
- **Cost:** ₹10,627/month (or FREE with credits)
- **Why:** Auto-scaling, better performance
- **Duration:** 12-18 months

### Phase 4: Enterprise (20,000+ users)
**Platform:** GCP or AWS
- **Cost:** ₹19,762-₹18,994/month
- **Why:** Enterprise-grade infrastructure, auto-scaling
- **Duration:** Ongoing

---

## Additional Cost Considerations

### Third-Party Services

**Email Service (SendGrid/AWS SES)**
- Up to 100,000 emails/month: $19.95/month (~₹1,662/month)

**Video Conferencing (for Study Groups)**
- Zoom API or Jitsi (self-hosted): $0-$100/month

**Payment Gateway**
- Razorpay: 2% per transaction
- Stripe: 2.9% + ₹2 per transaction

**Monitoring & Analytics**
- Google Analytics: Free
- Sentry (Error tracking): $26/month (~₹2,166/month)

**CDN (if not included)**
- Cloudflare: Free tier (sufficient for 20K users)

**Total Additional Services: ₹3,828-₹5,000/month**

---

## Total Cost of Ownership (First Year)

### For 10,000 Users:

#### Scenario 1: Hostinger Start → GCP Growth
| Period | Platform | Monthly Cost | Total |
|--------|----------|--------------|-------|
| Months 1-3 | Hostinger | ₹1,998 | ₹5,994 |
| Months 4-12 | GCP (with credits) | ₹0 | ₹0 |
| Additional Services | Various | ₹3,000 | ₹36,000 |
| **First Year Total** | | | **₹41,994** |

#### Scenario 2: GCP from Start
| Period | Platform | Monthly Cost | Total |
|--------|----------|--------------|-------|
| Months 1-12 | GCP (with credits) | ₹0 | ₹0 |
| Additional Services | Various | ₹3,000 | ₹36,000 |
| **First Year Total** | | | **₹36,000** |

### For 20,000 Users:

#### Scenario 1: Hostinger Start → GCP Growth
| Period | Platform | Monthly Cost | Total |
|--------|----------|--------------|-------|
| Months 1-6 | Hostinger | ₹2,831 | ₹16,986 |
| Months 7-12 | GCP (with credits) | ₹0 | ₹0 |
| Additional Services | Various | ₹4,000 | ₹48,000 |
| **First Year Total** | | | **₹64,986** |

#### Scenario 2: GCP from Start
| Period | Platform | Monthly Cost | Total |
|--------|----------|--------------|-------|
| Months 1-12 | GCP (with credits) | ₹0 | ₹0 |
| Additional Services | Various | ₹4,000 | ₹48,000 |
| **First Year Total** | | | **₹48,000** |

---

## Scaling Considerations

### At 10,000 Users:
- **GCP:** ₹10,627/month (FREE with credits)
- **AWS:** ₹10,231/month
- **Hostinger:** ₹1,998/month

### At 20,000 Users:
- **GCP:** ₹19,762/month (FREE with credits)
- **AWS:** ₹18,994/month
- **Hostinger:** ₹2,831/month

### At 50,000 Users:
- **GCP:** ~₹45,000/month
- **AWS:** ~₹42,000/month
- **Hostinger:** Not recommended (need upgrade)

### At 100,000 Users:
- **GCP:** ~₹85,000/month
- **AWS:** ~₹80,000/month

---

## Final Recommendation

### For PathFinder AI with 10,000 Users:

**Best Choice: Google Cloud Platform (GCP)**

**Reasons:**
1. **FREE for first 12-18 months** with Google for Startups credits
2. Auto-scaling handles traffic spikes
3. 99.95% uptime SLA
4. Global CDN for fast content delivery
5. Easy to scale to 20K+ users

**Budget Allocation (First Year):**
- Hosting: ₹0 (covered by credits)
- Additional Services: ₹36,000
- Domain & SSL: ₹1,500
- **Total: ₹37,500 for first year**

**After Credits Expire (Year 2+):**
- Monthly: ₹10,627 + ₹3,000 = ₹13,627/month
- Yearly: ₹1,63,524/year

---

### For PathFinder AI with 20,000 Users:

**Best Choice: Google Cloud Platform (GCP)**

**Reasons:**
1. **FREE for first 12-18 months** with Google for Startups credits
2. Auto-scaling handles traffic spikes
3. 99.95% uptime SLA
4. Global CDN for fast content delivery
5. Easy integration with other Google services
6. Better for long-term growth

**Implementation Plan:**
1. Apply for Google for Startups program
2. Set up GCP project with $100,000 credits
3. Deploy frontend on Cloud Storage + CDN
4. Deploy backend on Cloud Run
5. Set up Cloud SQL PostgreSQL
6. Configure monitoring and alerts
7. Implement auto-scaling policies

**Budget Allocation (First Year):**
- Hosting: ₹0 (covered by credits)
- Additional Services: ₹48,000
- Domain & SSL: ₹1,500
- **Total: ₹49,500 for first year**

**After Credits Expire (Year 2+):**
- Monthly: ₹19,762 + ₹4,000 = ₹23,762/month
- Yearly: ₹2,85,144/year

---

## Quick Comparison: 10K vs 20K Users

| Metric | 10,000 Users | 20,000 Users |
|--------|-------------|-------------|
| **GCP Monthly** | ₹10,627 | ₹19,762 |
| **Hostinger Monthly** | ₹1,998 | ₹2,831 |
| **AWS Monthly** | ₹10,231 | ₹18,994 |
| **First Year (GCP)** | ₹37,500 | ₹49,500 |
| **Database Storage** | 50 GB | 100 GB |
| **Bandwidth** | 250 GB | 500 GB |
| **Daily Active Users** | 2,500 | 5,000 |
| **API Requests/Day** | 25,000 | 50,000 |

---

## How to Apply for Google for Startups

1. Visit: https://cloud.google.com/startup
2. Requirements:
   - Registered startup (less than 5 years old)
   - First-time GCP user
   - Have a business plan
3. Benefits:
   - Up to $100,000 in GCP credits
   - Valid for 2 years
   - Technical support included
   - Access to startup community

---

## Monitoring & Optimization Tips

1. **Enable auto-scaling** to handle traffic variations
2. **Use CDN caching** to reduce server load
3. **Optimize database queries** with Prisma
4. **Implement lazy loading** for frontend assets
5. **Set up alerts** for resource usage
6. **Regular backups** (automated daily)
7. **Monitor costs** with GCP Cost Management

---

## Support & Maintenance

**Estimated Monthly Maintenance:**
- DevOps/Server Management: 10-15 hours
- Database optimization: 5 hours
- Security updates: 5 hours
- Monitoring & troubleshooting: 10 hours

**Total: 30-35 hours/month**

---

## Conclusion

### For 10,000 Users:
**Google Cloud Platform** is the clear winner with startup credits covering the first year completely.

**First Year Investment: ~₹37,500**
**Second Year Onwards: ~₹1,63,500/year**

### For 20,000 Users:
**Google Cloud Platform** offers the best value proposition with startup credits covering the first year completely.

**First Year Investment: ~₹49,500**
**Second Year Onwards: ~₹2,85,000/year**

### Key Takeaway:
With Google for Startups credits, you can run PathFinder AI for **10K-20K users at ZERO hosting cost** for the first 12-18 months. This allows you to invest saved hosting costs into product development, marketing, and user acquisition.

This is significantly lower than traditional hosting and provides enterprise-grade infrastructure with room to scale to 100,000+ users.
