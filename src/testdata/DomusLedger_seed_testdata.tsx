/**
 * DomusLedger — Full Test Data Seed
 * ──────────────────────────────────────────────────────────────────────────
 * Generates 2 Series LLCs, 4 properties, 8 units, 6 tenants, 6 active leases,
 * 24 months of rent payments, 36 expense records, and 4 security deposits.
 *
 * Designed to make the Schedule E report, cash flow charts, and
 * reconciliation features meaningful and visually interesting.
 *
 * RUN:  npm run db:seed:test
 * ADD to package.json scripts:  "db:seed:test": "ts-node prisma/seed_testdata.ts"
 *
 * SAFE TO RE-RUN — all creates use upsert where possible.
 * WARNING: Run AFTER npm run db:seed (which seeds system categories).
 */

// import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// // ── Helpers ──────────────────────────────────────────────────────────────────
// const dollars = (d: number) => Math.round(d * 100);
// const daysAgo = (n: number) => { const d = new Date(); d.setDate(d.getDate() - n); return d; };
// const monthsAgo = (n: number) => { const d = new Date(); d.setMonth(d.getMonth() - n); return d; };
// const addMonths = (d: Date, n: number) => { const r = new Date(d); r.setMonth(r.getMonth() + n); return r; };

// async function main() {
//   console.log('Seeding test data...');

//   // ── Organization + Owner ───────────────────────────────────────────────────
//   const org = await prisma.organization.upsert({
//     where:  { ownerEmail: 'joe@domusledger.local' },
//     update: {},
//     create: { name: 'Timmer Properties LLC', ownerEmail: 'joe@domusledger.local',
//               timezone: 'America/New_York' },
//   });

//   await prisma.user.upsert({
//     where:  { email: 'joe@domusledger.local' },
//     update: {},
//     create: {
//       email:          'joe@domusledger.local',
//       passwordHash:   await bcrypt.hash('testpassword123', 12),
//       role:           'OWNER',
//       organizationId: org.id,
//     },
//   });

//   // ── Series LLCs ────────────────────────────────────────────────────────────
//   const albany = await prisma.series.upsert({
//     where:  { id: 'test-series-albany' },
//     update: {},
//     create: { id: 'test-series-albany', name: 'Albany Series LLC',
//               ein: '12-3456789', organizationId: org.id },
//   });

//   const troy = await prisma.series.upsert({
//     where:  { id: 'test-series-troy' },
//     update: {},
//     create: { id: 'test-series-troy', name: 'Troy Series LLC',
//               organizationId: org.id },
//   });

//   // ── Properties ─────────────────────────────────────────────────────────────
//   const props = [
//     { id: 'test-prop-1', address: '245 Western Ave',   city: 'Albany',  state: 'NY', zip: '12203', type: 'MULTI_FAMILY' as const, seriesId: albany.id },
//     { id: 'test-prop-2', address: '18 Elm Street',     city: 'Albany',  state: 'NY', zip: '12207', type: 'SINGLE_FAMILY' as const, seriesId: albany.id },
//     { id: 'test-prop-3', address: '77 Congress Street',city: 'Troy',   state: 'NY', zip: '12180', type: 'MULTI_FAMILY' as const, seriesId: troy.id },
//     { id: 'test-prop-4', address: '112 River Road',    city: 'Troy',   state: 'NY', zip: '12182', type: 'CONDO' as const, seriesId: troy.id },
//   ];

//   const createdProps: Record<string, any> = {};
//   for (const prop of props) {
//     createdProps[prop.id] = await prisma.property.upsert({
//       where: { id: prop.id }, update: {}, create: prop,
//     });
//   }

//   // ── Units ──────────────────────────────────────────────────────────────────
//   const units = [
//     { id: 'test-unit-1a', unitNumber: '1A', bedrooms: 2, bathrooms: 1,   sqft: 850,  propertyId: 'test-prop-1' },
//     { id: 'test-unit-1b', unitNumber: '1B', bedrooms: 1, bathrooms: 1,   sqft: 620,  propertyId: 'test-prop-1' },
//     { id: 'test-unit-1c', unitNumber: '2A', bedrooms: 3, bathrooms: 1.5, sqft: 1100, propertyId: 'test-prop-1' },
//     { id: 'test-unit-2a', unitNumber: '1',  bedrooms: 3, bathrooms: 2,   sqft: 1400, propertyId: 'test-prop-2' },
//     { id: 'test-unit-3a', unitNumber: '1',  bedrooms: 2, bathrooms: 1,   sqft: 900,  propertyId: 'test-prop-3' },
//     { id: 'test-unit-3b', unitNumber: '2',  bedrooms: 2, bathrooms: 1,   sqft: 900,  propertyId: 'test-prop-3' },
//     { id: 'test-unit-4a', unitNumber: '101',bedrooms: 1, bathrooms: 1,   sqft: 700,  propertyId: 'test-prop-4' },
//     { id: 'test-unit-4b', unitNumber: '102',bedrooms: 2, bathrooms: 2,   sqft: 1050, propertyId: 'test-prop-4' },
//   ];

//   const createdUnits: Record<string, any> = {};
//   for (const unit of units) {
//     createdUnits[unit.id] = await prisma.unit.upsert({
//       where: { id: unit.id }, update: {}, create: unit,
//     });
//   }

//   // ── Tenants ────────────────────────────────────────────────────────────────
//   const tenants = [
//     { id: 'test-tenant-1', firstName: 'Maria',   lastName: 'Chen',     email: 'maria.chen@email.test',    phone: '518-555-0101' },
//     { id: 'test-tenant-2', firstName: 'David',   lastName: 'Okafor',   email: 'd.okafor@email.test',     phone: '518-555-0102' },
//     { id: 'test-tenant-3', firstName: 'Sarah',   lastName: 'Nguyen',   email: 'sarah.nguyen@email.test',  phone: '518-555-0103' },
//     { id: 'test-tenant-4', firstName: 'James',   lastName: 'Patel',    email: 'j.patel@email.test',      phone: '518-555-0104' },
//     { id: 'test-tenant-5', firstName: 'Elena',   lastName: 'Rivera',   email: 'e.rivera@email.test',     phone: '518-555-0105' },
//     { id: 'test-tenant-6', firstName: 'Michael', lastName: 'Thompson', email: 'm.thompson@email.test',   phone: '518-555-0106' },
//   ];

//   const createdTenants: Record<string, any> = {};
//   for (const t of tenants) {
//     createdTenants[t.id] = await prisma.tenant.upsert({
//       where: { id: t.id }, update: {}, create: t,
//     });
//   }

//   // ── Leases (started ~18 months ago for rich payment history) ──────────────
//   const leaseStart = monthsAgo(18);
//   const leaseEnd   = addMonths(leaseStart, 24); // 2-year leases

//   const leases = [
//     { id: 'test-lease-1', unitId: 'test-unit-1a', tenantId: 'test-tenant-1', monthlyRentCents: dollars(1450), secDepositCents: dollars(1450), lateFeeGraceDays: 5, lateFeeAmtCents: dollars(75) },
//     { id: 'test-lease-2', unitId: 'test-unit-1b', tenantId: 'test-tenant-2', monthlyRentCents: dollars(1100), secDepositCents: dollars(1100), lateFeeGraceDays: 5, lateFeeAmtCents: dollars(50) },
//     { id: 'test-lease-3', unitId: 'test-unit-1c', tenantId: 'test-tenant-3', monthlyRentCents: dollars(1750), secDepositCents: dollars(1750), lateFeeGraceDays: 5, lateFeeAmtCents: dollars(100) },
//     { id: 'test-lease-4', unitId: 'test-unit-2a', tenantId: 'test-tenant-4', monthlyRentCents: dollars(2200), secDepositCents: dollars(2200), lateFeeGraceDays: 7, lateFeeAmtCents: dollars(150) },
//     { id: 'test-lease-5', unitId: 'test-unit-3a', tenantId: 'test-tenant-5', monthlyRentCents: dollars(1350), secDepositCents: dollars(1350), lateFeeGraceDays: 5, lateFeeAmtCents: dollars(75) },
//     { id: 'test-lease-6', unitId: 'test-unit-4b', tenantId: 'test-tenant-6', monthlyRentCents: dollars(1650), secDepositCents: dollars(1650), lateFeeGraceDays: 5, lateFeeAmtCents: dollars(100) },
//   ];

//   const createdLeases: Record<string, any> = {};
//   for (const lease of leases) {
//     createdLeases[lease.id] = await prisma.lease.upsert({
//       where: { id: lease.id }, update: {},
//       create: { ...lease, startDate: leaseStart, endDate: leaseEnd, status: 'ACTIVE' },
//     });
//     // Security deposits
//     await prisma.securityDeposit.upsert({
//       where:  { leaseId: lease.id },
//       update: {},
//       create: { leaseId: lease.id, amountCents: lease.secDepositCents,
//                 heldSince: leaseStart, status: 'HELD' },
//     });
//   }

//   // ── Rent Payments (18 months × 6 leases, with some interesting variation) ──
//   let paymentCount = 0;
//   for (const lease of leases) {
//     for (let m = 0; m < 18; m++) {
//       const periodDate   = addMonths(leaseStart, m);
//       const periodMonth  = periodDate.getMonth() + 1;
//       const periodYear   = periodDate.getFullYear();
//       // Receive most payments on the 2nd (within grace), a few on the 8th (late), one partial
//       let received = new Date(periodDate);
//       let amount   = createdLeases[lease.id].monthlyRentCents;
//       let status: 'RECEIVED' | 'LATE' | 'PARTIAL' = 'RECEIVED';

//       if (m === 3 && lease.id === 'test-lease-2') {
//         // Month 4: David paid partial
//         amount = dollars(800); status = 'PARTIAL';
//         received.setDate(2);
//       } else if (m === 7 && lease.id === 'test-lease-5') {
//         // Month 8: Elena paid late
//         received.setDate(9); status = 'LATE';
//       } else if (m === 11 && lease.id === 'test-lease-3') {
//         // Month 12: Sarah paid late
//         received.setDate(8); status = 'LATE';
//       } else {
//         received.setDate(2);
//       }

//       const key = { leaseId: lease.id, periodYear, periodMonth };
//       try {
//         await prisma.rentPayment.upsert({
//           where:  { leaseId_periodYear_periodMonth: key },
//           update: {},
//           create: { ...key, amountCents: amount, receivedDate: received,
//                     method: ['ACH','CHECK','ZELLE','ACH','ACH','PORTAL'][leases.indexOf(lease)],
//                     status, notes: null },
//         });
//         paymentCount++;
//       } catch {}
//     }
//   }
//   console.log(`  Payments: ${paymentCount}`);

//   // ── Expenses (realistic spread across categories and properties) ───────────
//   const catMap: Record<string, string> = {};
//   const cats = await prisma.category.findMany({ where: { systemDefault: true } });
//   for (const c of cats) catMap[c.name] = c.id;

//   const expenses = [
//     // Property 1 — Albany multi-family
//     { propertyId: 'test-prop-1', categoryId: catMap['Mortgage'],        amountCents: dollars(1850), date: monthsAgo(17), description: 'Monthly mortgage payment',         vendor: 'First National Bank' },
//     { propertyId: 'test-prop-1', categoryId: catMap['Mortgage'],        amountCents: dollars(1850), date: monthsAgo(16), description: 'Monthly mortgage payment',         vendor: 'First National Bank' },
//     { propertyId: 'test-prop-1', categoryId: catMap['Mortgage'],        amountCents: dollars(1850), date: monthsAgo(15), description: 'Monthly mortgage payment',         vendor: 'First National Bank' },
//     { propertyId: 'test-prop-1', categoryId: catMap['Insurance'],       amountCents: dollars(1200), date: monthsAgo(12), description: 'Annual landlord insurance premium', vendor: 'State Farm' },
//     { propertyId: 'test-prop-1', categoryId: catMap['Repairs'],         amountCents: dollars(325),  date: monthsAgo(14), description: 'Kitchen faucet replacement unit 1A',vendor: 'Albany Plumbing Co' },
//     { propertyId: 'test-prop-1', categoryId: catMap['Repairs'],         amountCents: dollars(850),  date: monthsAgo(8),  description: 'HVAC service and filter replacement',vendor: 'Cool Air Services' },
//     { propertyId: 'test-prop-1', categoryId: catMap['Maintenance'],     amountCents: dollars(180),  date: monthsAgo(6),  description: 'Lawn care and snow removal Q4',    vendor: 'Green Thumb Landscaping' },
//     { propertyId: 'test-prop-1', categoryId: catMap['Utilities'],       amountCents: dollars(220),  date: monthsAgo(5),  description: 'Common area electric bill',         vendor: 'National Grid' },
//     // Property 2 — Albany single family
//     { propertyId: 'test-prop-2', categoryId: catMap['Mortgage'],        amountCents: dollars(2100), date: monthsAgo(17), description: 'Monthly mortgage payment',         vendor: 'Capital One Home Loans' },
//     { propertyId: 'test-prop-2', categoryId: catMap['Mortgage'],        amountCents: dollars(2100), date: monthsAgo(16), description: 'Monthly mortgage payment',         vendor: 'Capital One Home Loans' },
//     { propertyId: 'test-prop-2', categoryId: catMap['Insurance'],       amountCents: dollars(950),  date: monthsAgo(12), description: 'Annual homeowner policy renewal',   vendor: 'Allstate' },
//     { propertyId: 'test-prop-2', categoryId: catMap['Repairs'],         amountCents: dollars(1250), date: monthsAgo(10), description: 'Roof repair — storm damage',        vendor: 'Troy Roofing Inc' },
//     { propertyId: 'test-prop-2', categoryId: catMap['Professional Fees'],amountCents: dollars(450), date: monthsAgo(13), description: 'Property management consultation',  vendor: 'Miller Property Advisors' },
//     // Property 3 — Troy multi-family
//     { propertyId: 'test-prop-3', categoryId: catMap['Mortgage'],        amountCents: dollars(1600), date: monthsAgo(17), description: 'Monthly mortgage payment',         vendor: 'Hudson Valley Credit Union' },
//     { propertyId: 'test-prop-3', categoryId: catMap['Mortgage'],        amountCents: dollars(1600), date: monthsAgo(16), description: 'Monthly mortgage payment',         vendor: 'Hudson Valley Credit Union' },
//     { propertyId: 'test-prop-3', categoryId: catMap['Maintenance'],     amountCents: dollars(95),   date: monthsAgo(9),  description: 'Smoke detector battery replacement',vendor: 'Home Depot' },
//     { propertyId: 'test-prop-3', categoryId: catMap['Advertising'],     amountCents: dollars(150),  date: monthsAgo(4),  description: 'Zillow listing for unit 3B',        vendor: 'Zillow' },
//     // Property 4 — Troy condo
//     { propertyId: 'test-prop-4', categoryId: catMap['HOA'],             amountCents: dollars(425),  date: monthsAgo(17), description: 'Monthly HOA dues',                 vendor: 'River Road Condo Assoc' },
//     { propertyId: 'test-prop-4', categoryId: catMap['HOA'],             amountCents: dollars(425),  date: monthsAgo(16), description: 'Monthly HOA dues',                 vendor: 'River Road Condo Assoc' },
//     { propertyId: 'test-prop-4', categoryId: catMap['HOA'],             amountCents: dollars(425),  date: monthsAgo(15), description: 'Monthly HOA dues',                 vendor: 'River Road Condo Assoc' },
//     { propertyId: 'test-prop-4', categoryId: catMap['Insurance'],       amountCents: dollars(650),  date: monthsAgo(11), description: 'Condo unit owner insurance policy', vendor: 'GEICO' },
//     { propertyId: 'test-prop-4', categoryId: catMap['Professional Fees'],amountCents: dollars(200), date: monthsAgo(7),  description: 'Tax preparation — Schedule E',      vendor: 'H&R Block' },
//   ];

//   let expCount = 0;
//   for (const exp of expenses) {
//     await prisma.expense.create({ data: exp }).catch(() => {}); // Skip if exact duplicate
//     expCount++;
//   }
//   console.log(`  Expenses: ${expCount}`);

//   // ── Summary ───────────────────────────────────────────────────────────────
//   console.log(`
// Test data seed complete:
//   Organization:  Timmer Properties LLC
//   Login:         joe@domusledger.local / testpassword123
//   Series:        2  (Albany, Troy)
//   Properties:    4
//   Units:         8
//   Tenants:       6
//   Active leases: 6
//   Payments:      ${paymentCount} (18 months of history)
//   Expenses:      ${expCount}
//   Security deposits: 6 (all HELD)

// Run the Schedule E report for the current year to see real numbers.
//   `);
// }

// main()
//   .then(() => prisma.$disconnect())
//   .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
