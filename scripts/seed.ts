import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// ---- Chart of Accounts (reference) ----------------------------------
const accounts = [
  { code: "1000", nameEn: "Cash", nameMs: "Tunai", category: "asset", normalBalance: "debit" },
  { code: "1100", nameEn: "Accounts Receivable", nameMs: "Akaun Belum Terima", category: "asset", normalBalance: "debit" },
  { code: "1200", nameEn: "Inventory", nameMs: "Inventori", category: "asset", normalBalance: "debit" },
  { code: "1300", nameEn: "Prepaid Expenses", nameMs: "Belanja Telah Dibayar Dahulu", category: "asset", normalBalance: "debit" },
  { code: "1500", nameEn: "Equipment", nameMs: "Peralatan", category: "asset", normalBalance: "debit" },
  { code: "1510", nameEn: "Accumulated Depreciation", nameMs: "Susut Nilai Terkumpul", category: "asset", normalBalance: "credit", isContra: true },
  { code: "2000", nameEn: "Accounts Payable", nameMs: "Akaun Belum Bayar", category: "liability", normalBalance: "credit" },
  { code: "2100", nameEn: "Notes Payable", nameMs: "Wesel Bayar", category: "liability", normalBalance: "credit" },
  { code: "2200", nameEn: "Unearned Revenue", nameMs: "Hasil Diterima Dahulu", category: "liability", normalBalance: "credit" },
  { code: "2300", nameEn: "Salaries Payable", nameMs: "Gaji Belum Bayar", category: "liability", normalBalance: "credit" },
  { code: "3000", nameEn: "Owner's Capital", nameMs: "Modal Pemilik", category: "equity", normalBalance: "credit" },
  { code: "3100", nameEn: "Owner's Drawings", nameMs: "Pengeluaran Pemilik", category: "equity", normalBalance: "debit" },
  { code: "3200", nameEn: "Retained Earnings", nameMs: "Keuntungan Tertahan", category: "equity", normalBalance: "credit" },
  { code: "4000", nameEn: "Sales Revenue", nameMs: "Hasil Jualan", category: "revenue", normalBalance: "credit" },
  { code: "4100", nameEn: "Service Revenue", nameMs: "Hasil Perkhidmatan", category: "revenue", normalBalance: "credit" },
  { code: "5000", nameEn: "Cost of Goods Sold", nameMs: "Kos Barangan Dijual", category: "expense", normalBalance: "debit" },
  { code: "5100", nameEn: "Salaries Expense", nameMs: "Perbelanjaan Gaji", category: "expense", normalBalance: "debit" },
  { code: "5200", nameEn: "Rent Expense", nameMs: "Perbelanjaan Sewa", category: "expense", normalBalance: "debit" },
  { code: "5300", nameEn: "Utilities Expense", nameMs: "Perbelanjaan Utiliti", category: "expense", normalBalance: "debit" },
  { code: "5400", nameEn: "Depreciation Expense", nameMs: "Perbelanjaan Susut Nilai", category: "expense", normalBalance: "debit" },
  { code: "5500", nameEn: "Supplies Expense", nameMs: "Perbelanjaan Bekalan", category: "expense", normalBalance: "debit" },
  { code: "5600", nameEn: "Advertising Expense", nameMs: "Perbelanjaan Pengiklanan", category: "expense", normalBalance: "debit" },
];

// ---- Lessons ---------------------------------------------------------
type Section = {
  type: "intro" | "concept" | "example" | "interactive" | "tip";
  titleEn: string; titleMs: string;
  bodyEn: string; bodyMs: string;
  payload?: any;
};

type LessonSeed = {
  slug: string; order: number;
  titleEn: string; titleMs: string;
  summaryEn: string; summaryMs: string;
  icon: string; durationMin: number;
  sections: Section[];
};

const lessons: LessonSeed[] = [
  {
    slug: "accounting-equation",
    order: 1,
    titleEn: "The Accounting Equation",
    titleMs: "Persamaan Perakaunan",
    summaryEn: "Understand the foundation: Assets = Liabilities + Equity.",
    summaryMs: "Fahami asas: Aset = Liabiliti + Ekuiti.",
    icon: "Scale",
    durationMin: 10,
    sections: [
      {
        type: "intro",
        titleEn: "Why Does Accounting Exist?",
        titleMs: "Mengapa Perakaunan Wujud?",
        bodyEn: "Every business transaction affects what the business **owns** (assets), what it **owes** (liabilities), and what the owner **keeps** (equity). Double-entry accounting is simply a disciplined way to record these effects so the books always stay in balance. The single equation **Assets = Liabilities + Owner's Equity** is the lens through which every transaction is viewed, and every journal entry you will ever make must preserve this equality.",
        bodyMs: "Setiap urus niaga perniagaan mempengaruhi apa yang perniagaan **miliki** (aset), apa yang ia **hutang** (liabiliti), dan apa yang dipelihara **pemilik** (ekuiti). Perakaunan sistem catatan berganda hanyalah cara disiplin untuk merekodkan kesan-kesan ini supaya buku sentiasa seimbang. Persamaan tunggal **Aset = Liabiliti + Ekuiti Pemilik** adalah kanta yang digunakan untuk setiap urus niaga, dan setiap entri jurnal yang anda buat mesti mengekalkan kesamaan ini.",
      },
      {
        type: "concept",
        titleEn: "The Three Building Blocks",
        titleMs: "Tiga Blok Binaan Asas",
        bodyEn: "**Assets** are economic resources controlled by the business — cash, inventory, equipment, amounts owed to the business by customers. **Liabilities** are obligations to outsiders — accounts payable, loans, unearned revenue. **Equity** is the residual claim of the owner after liabilities are deducted from assets; it includes owner contributions, retained profits, and drawings. Whenever one of these changes, at least one other must change in a compensating way to keep the equation true.",
        bodyMs: "**Aset** ialah sumber ekonomi yang dikawal oleh perniagaan — tunai, inventori, peralatan, jumlah yang dihutang oleh pelanggan kepada perniagaan. **Liabiliti** ialah kewajipan kepada pihak luar — akaun belum bayar, pinjaman, hasil diterima dahulu. **Ekuiti** ialah tuntutan baki pemilik selepas liabiliti ditolak daripada aset; ia termasuk sumbangan pemilik, keuntungan tertahan, dan pengeluaran. Apabila salah satu berubah, sekurang-kurangnya satu lagi mesti berubah dengan cara pampasan untuk mengekalkan persamaan.",
      },
      {
        type: "example",
        titleEn: "Worked Example: Owner Invests RM10,000",
        titleMs: "Contoh Penyelesaian: Pemilik Melabur RM10,000",
        bodyEn: "Aisha starts a small consulting practice and deposits RM10,000 of her own money into a business bank account. The business now has RM10,000 of **Cash** (an asset that increased) and the owner has a RM10,000 claim against the business called **Owner's Capital** (equity that increased by the same amount). The equation still balances: 10,000 = 0 + 10,000. Nothing was owed to outsiders, so liabilities remained at zero. Notice how a single transaction always produces at least two effects — this is the heart of **double entry**.",
        bodyMs: "Aishah memulakan perniagaan perundingan kecil dan mendepositkan RM10,000 daripada wang sendiri ke dalam akaun bank perniagaan. Perniagaan kini mempunyai RM10,000 **Tunai** (aset yang meningkat) dan pemilik mempunyai tuntutan RM10,000 terhadap perniagaan yang dipanggil **Modal Pemilik** (ekuiti yang meningkat dengan jumlah yang sama). Persamaan masih seimbang: 10,000 = 0 + 10,000. Tiada hutang kepada pihak luar, jadi liabiliti kekal di sifar. Perhatikan bagaimana satu urus niaga sentiasa menghasilkan sekurang-kurangnya dua kesan — ini adalah teras **catatan berganda**.",
        payload: {
          entries: [
            { account: "Cash", debit: 10000, credit: 0 },
            { account: "Owner's Capital", debit: 0, credit: 10000 },
          ],
        },
      },
      {
        type: "interactive",
        titleEn: "Try It: Buy Equipment for Cash",
        titleMs: "Cuba: Beli Peralatan dengan Tunai",
        bodyEn: "Suppose the business buys a laptop for RM3,500 in cash. One asset (Equipment) goes up by RM3,500 while another asset (Cash) goes down by the same amount. Total assets are unchanged, and liabilities and equity are also unchanged — the equation still holds. Click through to the Practice Lab and build this entry yourself: debit Equipment 3,500, credit Cash 3,500.",
        bodyMs: "Katakan perniagaan membeli komputer riba dengan RM3,500 secara tunai. Satu aset (Peralatan) naik sebanyak RM3,500 manakala aset lain (Tunai) turun dengan jumlah yang sama. Jumlah aset tidak berubah, dan liabiliti serta ekuiti juga tidak berubah — persamaan masih kekal. Klik ke Makmal Latihan dan bina entri ini sendiri: debit Peralatan 3,500, kredit Tunai 3,500.",
        payload: {
          entries: [
            { account: "Equipment", debit: 3500, credit: 0 },
            { account: "Cash", debit: 0, credit: 3500 },
          ],
        },
      },
      {
        type: "tip",
        titleEn: "Mental Shortcut",
        titleMs: "Pintasan Minda",
        bodyEn: "If a transaction involves only assets (cash buys equipment, customer pays on account), total assets stay the same. If it involves a liability or equity account (borrowing, owner investment), assets change too. Memorising this single rule prevents 80% of beginner mistakes.",
        bodyMs: "Jika urus niaga hanya melibatkan aset (tunai beli peralatan, pelanggan bayar secara akaun), jumlah aset kekal sama. Jika ia melibatkan akaun liabiliti atau ekuiti (pinjaman, pelaburan pemilik), aset juga berubah. Menghafal satu peraturan ini mengelakkan 80% kesilapan pemula.",
      },
    ],
  },
  {
    slug: "debits-and-credits",
    order: 2,
    titleEn: "Debits, Credits & Normal Balances",
    titleMs: "Debit, Kredit & Baki Normal",
    summaryEn: "Learn the rules: which accounts increase on which side.",
    summaryMs: "Pelajari peraturan: akaun mana meningkat di sebelah mana.",
    icon: "ArrowLeftRight",
    durationMin: 12,
    sections: [
      {
        type: "intro",
        titleEn: "Left and Right, Nothing More",
        titleMs: "Kiri dan Kanan, Itu Sahaja",
        bodyEn: "The words **debit** and **credit** sound intimidating but they mean nothing more than **left** and **right**. Every account has a *normal balance* — the side on which it increases. Assets and expenses increase on the debit (left) side; liabilities, equity, and revenue increase on the credit (right) side. To decrease an account, you record on the opposite side. Once you internalise this matrix, every journal entry becomes a puzzle with clear rules.",
        bodyMs: "Perkataan **debit** dan **kredit** kedengaran menakutkan tetapi ia hanya bermaksud **kiri** dan **kanan**. Setiap akaun mempunyai *baki normal* — sebelah mana ia meningkat. Aset dan perbelanjaan meningkat di sebelah debit (kiri); liabiliti, ekuiti, dan hasil meningkat di sebelah kredit (kanan). Untuk mengurangkan akaun, anda rekod di sebelah bertentangan. Setelah anda faham matriks ini, setiap entri jurnal menjadi teka-teki dengan peraturan jelas.",
      },
      {
        type: "concept",
        titleEn: "The Five-Account Matrix",
        titleMs: "Matriks Lima Akaun",
        bodyEn: "Memorise this table — it is the most useful single page in your entire accounting course. **Assets** and **Expenses** carry a normal **debit** balance: they increase with debits and decrease with credits. **Liabilities**, **Equity**, and **Revenue** carry a normal **credit** balance: they increase with credits and decrease with debits. Contra accounts (like Accumulated Depreciation) flip the rule — they sit on the opposite side of their parent category, which is why Accumulated Depreciation has a credit normal balance even though it is an asset-contra.",
        bodyMs: "Hafal jadual ini — ia adalah halaman paling berguna dalam keseluruhan kursus perakaunan anda. **Aset** dan **Perbelanjaan** mempunyai baki normal **debit**: ia meningkat dengan debit dan berkurang dengan kredit. **Liabiliti**, **Ekuiti**, dan **Hasil** mempunyai baki normal **kredit**: ia meningkat dengan kredit dan berkurang dengan debit. Akaun kontra (seperti Susut Nilai Terkumpul) menyongsangkan peraturan — ia berada di sebelah bertentangan kategori induknya, sebab itulah Susut Nilai Terkumpul mempunyai baki normal kredit walaupun ia adalah akaun kontra aset.",
        payload: {
          matrix: [
            { category: "Asset", categoryMs: "Aset", increase: "debit", decrease: "credit", normal: "debit" },
            { category: "Expense", categoryMs: "Perbelanjaan", increase: "debit", decrease: "credit", normal: "debit" },
            { category: "Liability", categoryMs: "Liabiliti", increase: "credit", decrease: "debit", normal: "credit" },
            { category: "Equity", categoryMs: "Ekuiti", increase: "credit", decrease: "debit", normal: "credit" },
            { category: "Revenue", categoryMs: "Hasil", increase: "credit", decrease: "debit", normal: "credit" },
          ],
        },
      },
      {
        type: "example",
        titleEn: "Worked Example: Pay Rent RM1,200",
        titleMs: "Contoh Penyelesaian: Bayar Sewa RM1,200",
        bodyEn: "The business pays RM1,200 cash for office rent. Rent Expense (an expense account with a normal debit balance) **increases** — so we debit it. Cash (an asset with a normal debit balance) **decreases** — so we credit it. The entry is: **Debit Rent Expense 1,200 / Credit Cash 1,200**. Notice how we always pair an increase on one side with an effect on the other side; debits always equal credits, which is the discipline that keeps the books balanced.",
        bodyMs: "Perniagaan membayar RM1,200 tunai untuk sewa pejabat. Perbelanjaan Sewa (akaun perbelanjaan dengan baki normal debit) **meningkat** — jadi kita debit. Tunai (aset dengan baki normal debit) **berkurang** — jadi kita kredit. Entri ialah: **Debit Perbelanjaan Sewa 1,200 / Kredit Tunai 1,200**. Perhatikan bagaimana kita sentiasa memadankan peningkatan di satu sisi dengan kesan di sisi lain; debit sentiasa sama dengan kredit, yang merupakan disiplin mengekalkan buku seimbang.",
        payload: {
          entries: [
            { account: "Rent Expense", debit: 1200, credit: 0 },
            { account: "Cash", debit: 0, credit: 1200 },
          ],
        },
      },
      {
        type: "interactive",
        titleEn: "Try It: Sell Service on Credit",
        titleMs: "Cuba: Jual Perkhidmatan Secara Kredit",
        bodyEn: "The business performs RM2,500 of consulting services for a client who will pay next month. Service Revenue (revenue, normal credit) increases — credit it. Accounts Receivable (asset, normal debit) increases — debit it. Build this in the Practice Lab: debit Accounts Receivable 2,500, credit Service Revenue 2,500.",
        bodyMs: "Perniagaan memberi perkhidmatan perundingan RM2,500 kepada pelanggan yang akan membayar bulan depan. Hasil Perkhidmatan (hasil, normal kredit) meningkat — kreditkan. Akaun Belum Terima (aset, normal debit) meningkat — debitkan. Bina ini di Makmal Latihan: debit Akaun Belum Terima 2,500, kredit Hasil Perkhidmatan 2,500.",
        payload: {
          entries: [
            { account: "Accounts Receivable", debit: 2500, credit: 0 },
            { account: "Service Revenue", debit: 0, credit: 2500 },
          ],
        },
      },
      {
        type: "tip",
        titleEn: "Don't Say 'Plus' or 'Minus'",
        titleMs: "Jangan Sebut 'Tambah' atau 'Tolak'",
        bodyEn: "Beginners often say 'I added to cash' — but did you debit it or credit it? Force yourself to use the words debit and credit from day one. It feels awkward at first but it shortens the path to fluency dramatically. Within a week, your brain will auto-translate 'cash went up' into 'debit Cash'.",
        bodyMs: "Pemula sering berkata 'saya tambah tunai' — tetapi adakah anda debit atau kredit? Paksa diri anda menggunakan perkataan debit dan kredit dari hari pertama. Ia berasa janggal pada mulanya tetapi ia memendekkan laluan ke kefasihan dengan ketara. Dalam seminggu, otak anda akan auto-terjemah 'tunai naik' kepada 'debit Tunai'.",
      },
    ],
  },
  {
    slug: "journal-entries",
    order: 3,
    titleEn: "Recording Journal Entries",
    titleMs: "Merekod Entri Jurnal",
    summaryEn: "Step-by-step: from transaction to a properly formatted journal entry.",
    summaryMs: "Langkah demi langkah: dari urus niaga ke entri jurnal yang diformat dengan betul.",
    icon: "BookOpen",
    durationMin: 14,
    sections: [
      {
        type: "intro",
        titleEn: "The Journal Is the Diary of Business",
        titleMs: "Jurnal Ialah Diari Perniagaan",
        bodyEn: "The **general journal** is the chronological record of every transaction in the order it occurs. Each entry shows the date, the accounts affected (debit account listed first, indented credit account below), a brief explanation, and a reference number. The journal is the first place a transaction enters the accounting system — from here, amounts will be posted to the ledger (T-accounts), then summarised into a trial balance, and finally flow into the financial statements.",
        bodyMs: "**Jurnal umum** ialah rekod kronologi setiap urus niaga mengikut urutan ia berlaku. Setiap entri menunjukkan tarikh, akaun yang terjejas (akaun debit disenaraikan dahulu, akaun kredit diindent di bawah), penerangan ringkas, dan nombor rujukan. Jurnal ialah tempat pertama urus niaga memasuki sistem perakaunan — dari sini, jumlah akan dipos ke lejar (akaun-T), kemudian diringkaskan ke dalam imbangan ujian, dan akhirnya mengalir ke penyata kewangan.",
      },
      {
        type: "concept",
        titleEn: "Anatomy of a Perfect Journal Entry",
        titleMs: "Anatomi Entri Jurnal yang Sempurna",
        bodyEn: "Every correct journal entry shares five features. (1) The **date** is written once at the top, identifying when the transaction occurred. (2) The **debit account** is written first, flush left. (3) The **credit account** is written below, indented. (4) The **amounts** are recorded in two separate debit and credit columns; their totals must be equal. (5) A short **narration** beginning with 'To' (for credits) or 'Being' explains the transaction. Following this template religiously prevents the most common error: debiting when you meant to credit.",
        bodyMs: "Setiap entri jurnal yang betul berkongsi lima ciri. (1) **Tarikh** ditulis sekali di atas, mengenal pasti bila urus niaga berlaku. (2) **Akaun debit** ditulis dahulu, sejajar kiri. (3) **Akaun kredit** ditulis di bawah, diindent. (4) **Jumlah** direkodkan dalam dua lajur debit dan kredit yang berasingan; jumlahnya mesti sama. (5) **Narasi** ringkas bermula dengan 'Kepada' (untuk kredit) atau 'Merupakan' menerangkan urus niaga. Mengikut templat ini secara ketat mengelakkan kesilapan paling biasa: debit apabila anda maksudkan kredit.",
      },
      {
        type: "example",
        titleEn: "Worked Example: Purchase Inventory on Credit",
        titleMs: "Contoh Penyelesaian: Beli Inventori Secara Kredit",
        bodyEn: "On 5 January, ABC Trading purchases RM8,000 of inventory from Supplier XYZ on credit (will pay in 30 days). Inventory (asset, normal debit) increases — debit. Accounts Payable (liability, normal credit) increases — credit. The journal entry is: **Debit Inventory 8,000 / Credit Accounts Payable 8,000**, narration 'Being purchase of inventory on credit from Supplier XYZ'. Total debits (8,000) equal total credits (8,000) — the entry is balanced and ready to post to the ledger.",
        bodyMs: "Pada 5 Januari, ABC Trading membeli inventori RM8,000 daripada Pembekal XYZ secara kredit (akan bayar dalam 30 hari). Inventori (aset, normal debit) meningkat — debit. Akaun Belum Bayar (liabiliti, normal kredit) meningkat — kredit. Entri jurnal ialah: **Debit Inventori 8,000 / Kredit Akaun Belum Bayar 8,000**, narasi 'Merupakan pembelian inventori secara kredit daripada Pembekal XYZ'. Jumlah debit (8,000) sama dengan jumlah kredit (8,000) — entri seimbang dan sedia untuk dipos ke lejar.",
        payload: {
          entries: [
            { account: "Inventory", debit: 8000, credit: 0 },
            { account: "Accounts Payable", debit: 0, credit: 8000 },
          ],
        },
      },
      {
        type: "interactive",
        titleEn: "Try It: Pay Supplier",
        titleMs: "Cuba: Bayar Pembekal",
        bodyEn: "On 4 February, ABC Trading pays Supplier XYZ in full for the January purchase. Accounts Payable (liability) decreases — debit it. Cash (asset) decreases — credit it. Build this in the Practice Lab: debit Accounts Payable 8,000, credit Cash 8,000.",
        bodyMs: "Pada 4 Februari, ABC Trading membayar Pembekal XYZ secara penuh untuk pembelian Januari. Akaun Belum Bayar (liabiliti) berkurang — debit. Tunai (aset) berkurang — kredit. Bina ini di Makmal Latihan: debit Akaun Belum Bayar 8,000, kredit Tunai 8,000.",
        payload: {
          entries: [
            { account: "Accounts Payable", debit: 8000, credit: 0 },
            { account: "Cash", debit: 0, credit: 8000 },
          ],
        },
      },
      {
        type: "tip",
        titleEn: "Compound Entries Are Allowed",
        titleMs: "Entri Kompaun Dibenarkan",
        bodyEn: "Some transactions involve more than two accounts — for example, buying equipment for RM5,000 by paying RM2,000 cash and signing a note for RM3,000. This produces a compound entry: debit Equipment 5,000, credit Cash 2,000, credit Notes Payable 3,000. As long as total debits equal total credits, the entry is valid.",
        bodyMs: "Sesetengah urus niaga melibatkan lebih daripada dua akaun — contohnya, membeli peralatan RM5,000 dengan membayar RM2,000 tunai dan menandatangani wesel untuk RM3,000. Ini menghasilkan entri kompaun: debit Peralatan 5,000, kredit Tunai 2,000, kredit Wesel Bayar 3,000. Selagi jumlah debit sama dengan jumlah kredit, entri itu sah.",
      },
    ],
  },
  {
    slug: "ledger-taccounts",
    order: 4,
    titleEn: "Ledger & T-Accounts",
    titleMs: "Lejar & Akaun-T",
    summaryEn: "Posting from journal to ledger — and reading a T-account.",
    summaryMs: "Mempos dari jurnal ke lejar — dan membaca akaun-T.",
    icon: "BookCopy",
    durationMin: 12,
    sections: [
      {
        type: "intro",
        titleEn: "From Diary to Filing Cabinet",
        titleMs: "Dari Diari ke Kabinet Fail",
        bodyEn: "If the journal is the diary of business, the **ledger** is the filing cabinet — it sorts transactions by account so you can see at a glance how much Cash, Inventory, or Rent Expense has moved during the period. Each ledger account is shaped like a **T**: the left side is the debit side, the right side is the credit side. After posting every journal entry to its corresponding T-accounts, you total each side and compute the ending balance.",
        bodyMs: "Jika jurnal ialah diari perniagaan, **lejar** ialah kabinet fail — ia menyusun urus niaga mengikut akaun supaya anda boleh lihat sekali pandang berapa banyak Tunai, Inventori, atau Perbelanjaan Sewa yang bergerak dalam tempoh tersebut. Setiap akaun lejar berbentuk **T**: sebelah kiri ialah sebelah debit, sebelah kanan ialah sebelah kredit. Selepas mempos setiap entri jurnal ke akaun-T yang sepadan, anda menjumlahkan setiap sisi dan mengira baki akhir.",
      },
      {
        type: "concept",
        titleEn: "How to Compute an Account Balance",
        titleMs: "Cara Mengira Baki Akaun",
        bodyEn: "After all entries are posted, sum the debit side and sum the credit side. The account's **ending balance** is the difference, written on whichever side has the larger total. For asset and expense accounts (normal debit), if debits exceed credits, the balance is a debit; for liability, equity, and revenue accounts (normal credit), if credits exceed debits, the balance is a credit. If the relationship is reversed (rare), the account has an *abnormal balance* — usually a sign of an error or a refund.",
        bodyMs: "Selepas semua entri dipos, jumlahkan sebelah debit dan jumlahkan sebelah kredit. **Baki akhir** akaun ialah perbezaan, ditulis di sebelah mana yang mempunyai jumlah lebih besar. Untuk akaun aset dan perbelanjaan (normal debit), jika debit melebihi kredit, baki ialah debit; untuk akaun liabiliti, ekuiti, dan hasil (normal kredit), jika kredit melebihi debit, baki ialah kredit. Jika hubungan terbalik (jarang), akaun mempunyai *baki tidak normal* — biasanya tanda ralat atau bayaran balik.",
      },
      {
        type: "example",
        titleEn: "Worked Example: Cash T-Account",
        titleMs: "Contoh Penyelesaian: Akaun-T Tunai",
        bodyEn: "Suppose Cash had these entries during January: (1) Owner investment debit 10,000; (2) Buy equipment credit 3,500; (3) Pay rent credit 1,200; (4) Receive revenue debit 2,500. Total debits = 12,500; total credits = 4,700. Ending balance = 12,500 − 4,700 = **RM7,800 debit**. This number will appear on the trial balance as a debit of 7,800 next to Cash, and on the balance sheet as a current asset of RM7,800.",
        bodyMs: "Katakan Tunai mempunyai entri berikut pada Januari: (1) Pelaburan pemilik debit 10,000; (2) Beli peralatan kredit 3,500; (3) Bayar sewa kredit 1,200; (4) Terima hasil debit 2,500. Jumlah debit = 12,500; jumlah kredit = 4,700. Baki akhir = 12,500 − 4,700 = **RM7,800 debit**. Nombor ini akan muncul pada imbangan ujian sebagai debit 7,800 di sebelah Tunai, dan pada kunci kira-kira sebagai aset semasa RM7,800.",
        payload: {
          tAccount: {
            account: "Cash",
            entries: [
              { side: "debit", amount: 10000, desc: "Owner investment" },
              { side: "debit", amount: 2500, desc: "Service revenue" },
              { side: "credit", amount: 3500, desc: "Buy equipment" },
              { side: "credit", amount: 1200, desc: "Pay rent" },
            ],
          },
        },
      },
      {
        type: "interactive",
        titleEn: "Try It: Build a T-Account Live",
        titleMs: "Cuba: Bina Akaun-T Secara Langsung",
        bodyEn: "Open the Practice Lab. Build the four entries above and watch the Cash T-account update in real time. You will see debits stack on the left, credits on the right, and the ending balance calculated automatically. This is exactly how a real accounting system works under the hood.",
        bodyMs: "Buka Makmal Latihan. Bina empat entri di atas dan tonton akaun-T Tunai dikemas kini secara langsung. Anda akan nampak debit bertindan di kiri, kredit di kanan, dan baki akhir dikira secara automatik. Inilah cara sistem perakaunan sebenar berfungsi di bawah tudung.",
      },
      {
        type: "tip",
        titleEn: "Posting Order Matters Less Than You Think",
        titleMs: "Urutan Mempos Kurang Penting Daripada Yang Anda Fikir",
        bodyEn: "Whether you post entries in date order or in journal order, the ending balances will be the same — the ledger is additive. What matters is that you post **every** debit and **every** credit, and that you don't accidentally swap the side. Use a checklist: read each journal line, find the matching T-account, write the amount on the correct side, and tick the journal line.",
        bodyMs: "Sama ada anda mempos entri mengikut urutan tarikh atau urutan jurnal, baki akhir akan sama — lejar adalah tambahan. Yang penting ialah anda mempos **setiap** debit dan **setiap** kredit, dan anda tidak tersilap tukar sisi. Gunakan senarai semak: baca setiap baris jurnal, cari akaun-T yang sepadan, tulis jumlah di sebelah betul, dan tandakan baris jurnal.",
      },
    ],
  },
  {
    slug: "trial-balance",
    order: 5,
    titleEn: "The Trial Balance",
    titleMs: "Imbangan Ujian",
    summaryEn: "Verify the ledger: total debits must equal total credits.",
    summaryMs: "Sahkan lejar: jumlah debit mesti sama dengan jumlah kredit.",
    icon: "ListChecks",
    durationMin: 10,
    sections: [
      {
        type: "intro",
        titleEn: "The First Health Check",
        titleMs: "Pemeriksaan Kesihatan Pertama",
        bodyEn: "After all entries are posted to the ledger, the accountant prepares a **trial balance** — a list of every account with its debit or credit balance, with totals at the bottom. If total debits equal total credits, the books are *in balance* and you can proceed to financial statements. If they don't, an error exists somewhere — usually a transposition, a slide, a missed posting, or an entry recorded on the wrong side. The trial balance is not proof of correctness (an entry can be balanced but wrong), but it is the first essential check.",
        bodyMs: "Selepas semua entri dipos ke lejar, akauntan menyediakan **imbangan ujian** — senarai setiap akaun dengan baki debit atau kreditnya, dengan jumlah di bawah. Jika jumlah debit sama dengan jumlah kredit, buku *seimbang* dan anda boleh terus ke penyata kewangan. Jika tidak, ralat wujud di suatu tempat — biasanya tersalah tukar digit, tersasar, tertinggal pos, atau entri direkod di sebelah salah. Imbangan ujian bukan bukti kebenaran (entri boleh seimbang tetapi salah), tetapi ia adalah semakan pertama yang penting.",
      },
      {
        type: "concept",
        titleEn: "What the Trial Balance Catches (and Misses)",
        titleMs: "Apa yang Imbangan Ujian Tangkap (dan Tertinggal)",
        bodyEn: "The trial balance catches **mathematical errors**: an unbalanced entry, a missed side, an arithmetic slip. It does **not** catch errors of principle (e.g., debiting the wrong account but by the correct amount), errors of omission (a transaction not recorded at all), errors of commission (right account name but wrong subsidiary), or compensating errors (two mistakes that happen to cancel out). For these, you need reconciliations, control accounts, and external confirmations.",
        bodyMs: "Imbangan ujian menangkap **ralat matematik**: entri tidak seimbang, sebelah tertinggal, kesilapan aritmetik. Ia **tidak** menangkap ralat prinsip (contohnya, debit akaun salah tetapi dengan jumlah betul), ralat tertinggal (urus niaga tidak direkod langsung), ralat suruhanjaya (nama akaun betul tetapi anak syarikat salah), atau ralat pampasan (dua kesilapan yang kebetulan saling membatalkan). Untuk ini, anda memerlukan pentakbiran, akaun kawalan, dan pengesahan luaran.",
      },
      {
        type: "example",
        titleEn: "Worked Example: A Simple Trial Balance",
        titleMs: "Contoh Penyelesaian: Imbangan Ujian Ringkas",
        bodyEn: "Using our running example, the trial balance after January would show: Debit side — Cash 7,800, Equipment 3,500, Rent Expense 1,200, Accounts Receivable 2,500 = 15,000. Credit side — Owner's Capital 10,000, Service Revenue 2,500 = 12,500. Wait — these don't match! That's because we forgot the entry 'Buy equipment with cash' which debits Equipment and credits Cash. Recheck your work before declaring the books balanced. The lesson: a real trial balance is the moment of truth.",
        bodyMs: "Menggunakan contoh kita, imbangan ujian selepas Januari akan menunjukkan: Sebelah debit — Tunai 7,800, Peralatan 3,500, Perbelanjaan Sewa 1,200, Akaun Belum Terima 2,500 = 15,000. Sebelah kredit — Modal Pemilik 10,000, Hasil Perkhidmatan 2,500 = 12,500. Tunggu — ini tidak sepadan! Itu kerana kita terlupa entri 'Beli peralatan dengan tunai' yang debit Peralatan dan kredit Tunai. Semak semula kerja anda sebelum mengisytiharkan buku seimbang. Pelajaran: imbangan ujian sebenar adalah saat kebenaran.",
      },
      {
        type: "interactive",
        titleEn: "Try It: Spot the Out-of-Balance",
        titleMs: "Cuba: Kesahn Ketidakseimbangan",
        bodyEn: "Build any 5 entries in the Practice Lab. The system auto-generates a trial balance. Try deliberately introducing an error (e.g., record only the debit side of an entry) and watch the totals diverge. This will train your eye to detect imbalance instantly.",
        bodyMs: "Bina 5 entri dalam Makmal Latihan. Sistem menjana imbangan ujian secara automatik. Cuba sengaja memperkenalkan ralat (contohnya, rekod hanya sebelah debit entri) dan tonton jumlah berbeza. Ini akan melatih mata anda untuk mengesan ketidakseimbangan serta-merta.",
      },
      {
        type: "tip",
        titleEn: "Search in This Order",
        titleMs: "Cari Mengikut Urutan Ini",
        bodyEn: "When totals don't match, divide the difference by 2 — if the result matches an account balance, you've probably posted a debit as a credit (or vice versa). Divide by 9 — if it divides evenly, look for a transposition (e.g., 63 written as 36). Divide by 10 — if it divides evenly, look for a slide (e.g., 1,200 written as 120). These three shortcuts save hours of hunting.",
        bodyMs: "Apabila jumlah tidak sepadan, bahagikan perbezaan dengan 2 — jika hasilnya sepadan dengan baki akaun, anda mungkin mempos debit sebagai kredit (atau sebaliknya). Bahagikan dengan 9 — jika ia bahagi sama rata, cari tersalah tukar digit (contohnya, 63 ditulis sebagai 36). Bahagikan dengan 10 — jika ia bahagi sama rata, cari tersasar (contohnya, 1,200 ditulis sebagai 120). Tiga pintasan ini menjimatkan berjam-jam pemburuan.",
      },
    ],
  },
  {
    slug: "financial-statements",
    order: 6,
    titleEn: "Financial Statements",
    titleMs: "Penyata Kewangan",
    summaryEn: "Income Statement, Statement of Changes in Equity, Balance Sheet.",
    summaryMs: "Penyata Pendapatan, Penyata Perubahan Ekuiti, Kunci Kira-Kira.",
    icon: "FileText",
    durationMin: 14,
    sections: [
      {
        type: "intro",
        titleEn: "The Three Outputs of Double Entry",
        titleMs: "Tiga Output Catatan Berganda",
        bodyEn: "Double entry's ultimate purpose is to produce three linked financial statements. The **Income Statement** reports revenue minus expenses for the period, yielding net profit or loss. The **Statement of Changes in Equity** rolls forward beginning equity, adds net profit and owner contributions, and deducts drawings to reach ending equity. The **Balance Sheet** lists assets, liabilities, and ending equity at period end — and must satisfy Assets = Liabilities + Equity. Together, these tell stakeholders whether the business is profitable, solvent, and growing.",
        bodyMs: "Tujuan akhir catatan berganda ialah menghasilkan tiga penyata kewangan yang berkaitan. **Penyata Pendapatan** melaporkan hasil tolak perbelanjaan untuk tempoh tersebut, menghasilkan keuntungan atau kerugian bersih. **Penyata Perubahan Ekuiti** membuang baki ekuiti awal, menambah keuntungan bersih dan sumbangan pemilik, dan menolak pengeluaran untuk sampai ke baki ekuiti akhir. **Kunci Kira-Kira** menyenaraikan aset, liabiliti, dan ekuiti akhir pada akhir tempoh — dan mesti memenuhi Aset = Liabiliti + Ekuiti. Bersama-sama, ini memberitahu pihak berkepentingan sama ada perniagaan menguntungkan, solven, dan berkembang.",
      },
      {
        type: "concept",
        titleEn: "How the Statements Link Together",
        titleMs: "Bagaimana Penyata Berhubung Antara Satu Sama Lain",
        bodyEn: "The three statements are not independent — they form a chain. Net profit from the bottom of the **Income Statement** flows into the top of the **Statement of Changes in Equity**. Ending equity from the bottom of that statement flows into the equity section of the **Balance Sheet**. Asset and liability balances come straight from the trial balance. Because of this chain, an error in the income statement propagates to the balance sheet, which is why the trial balance check is so important.",
        bodyMs: "Tiga penyata tidak bebas — ia membentuk rantaian. Keuntungan bersih dari bawah **Penyata Pendapatan** mengalir ke atas **Penyata Perubahan Ekuiti**. Baki ekuiti akhir dari bawah penyata itu mengalir ke bahagian ekuiti **Kunci Kira-Kira**. Baki aset dan liabiliti datang terus dari imbangan ujian. Disebabkan rantaian ini, ralat dalam penyata pendapatan merebak ke kunci kira-kira, sebab itulah semakan imbangan ujian sangat penting.",
      },
      {
        type: "example",
        titleEn: "Worked Example: Mini Statements",
        titleMs: "Contoh Penyelesaian: Penyata Mini",
        bodyEn: "Using our running example: Income Statement shows Service Revenue 2,500 minus Rent Expense 1,200 = **Net Profit RM1,300**. Statement of Changes in Equity: Beginning Capital 0 + Owner Investment 10,000 + Net Profit 1,300 − Drawings 0 = **Ending Capital RM11,300**. Balance Sheet: Assets (Cash 7,800 + Equipment 3,500 + AR 2,500 = 13,800) = Liabilities (0) + Equity (11,300) + ... wait, that's 13,800 ≠ 11,300. The gap of 2,500 reveals that we double-counted Accounts Receivable against revenue already received in cash — a real mistake students make. Always cross-check the balance sheet equation.",
        bodyMs: "Menggunakan contoh kita: Penyata Pendapatan menunjukkan Hasil Perkhidmatan 2,500 tolak Perbelanjaan Sewa 1,200 = **Keuntungan Bersih RM1,300**. Penyata Perubahan Ekuiti: Modal Awal 0 + Pelaburan Pemilik 10,000 + Keuntungan Bersih 1,300 − Pengeluaran 0 = **Modal Akhir RM11,300**. Kunci Kira-Kira: Aset (Tunai 7,800 + Peralatan 3,500 + ABT 2,500 = 13,800) = Liabiliti (0) + Ekuiti (11,300) + ... tunggu, itu 13,800 ≠ 11,300. Jurang 2,500 mendedahkan bahawa kita mengira berganda Akaun Belum Terima terhadap hasil yang sudah diterima dalam tunai — kesilapan sebenar yang dibuat pelajar. Sentiasa semak silang persamaan kunci kira-kira.",
      },
      {
        type: "interactive",
        titleEn: "Try It: Build a Full Cycle",
        titleMs: "Cuba: Bina Kitaran Penuh",
        bodyEn: "In the Practice Lab, record all the entries from the worked examples in lessons 1–5. The system will automatically generate a trial balance, and from that derive an income statement, statement of changes in equity, and balance sheet. You will see how each statement flows into the next, and how the balance sheet ultimately balances — the moment of truth for every accounting cycle.",
        bodyMs: "Dalam Makmal Latihan, rekodkan semua entri dari contoh penyelesaian dalam pelajaran 1–5. Sistem akan menjana imbangan ujian secara automatik, dan dari itu menerbitkan penyata pendapatan, penyata perubahan ekuiti, dan kunci kira-kira. Anda akan lihat bagaimana setiap penyata mengalir ke yang seterusnya, dan bagaimana kunci kira-kira akhirnya seimbang — saat kebenaran untuk setiap kitaran perakaunan.",
      },
      {
        type: "tip",
        titleEn: "Memorise the Order",
        titleMs: "Hafal Urutannya",
        bodyEn: "Always prepare statements in this order: (1) Income Statement, (2) Statement of Changes in Equity, (3) Balance Sheet. Preparing them out of order will leave you stuck — you cannot finish the balance sheet until you know ending equity, and you cannot know ending equity until you know net profit. This is the single most-tested sequence on university accounting exams.",
        bodyMs: "Sentiasa sediakan penyata mengikut urutan ini: (1) Penyata Pendapatan, (2) Penyata Perubahan Ekuiti, (3) Kunci Kira-Kira. Menyediakannya tidak mengikut urutan akan meninggalkan anda terperangkap — anda tidak boleh menyelesaikan kunci kira-kira sehingga anda tahu baki ekuiti akhir, dan anda tidak boleh tahu baki ekuiti akhir sehingga anda tahu keuntungan bersih. Ini adalah urutan yang paling banyak diuji dalam peperiksaan perakaunan universiti.",
      },
    ],
  },
];

// ---- Quiz questions --------------------------------------------------
type Q = {
  type: "mcq" | "journal" | "classify";
  lessonSlug?: string;
  promptEn: string; promptMs: string;
  optionsEn: string[]; optionsMs: string[];
  answerKey: string;
  explanationEn: string; explanationMs: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  points?: number;
};

const questions: Q[] = [
  {
    type: "mcq", lessonSlug: "accounting-equation", difficulty: "beginner", points: 1,
    promptEn: "Which equation correctly represents the fundamental accounting equation?",
    promptMs: "Persamaan manakah yang mewakili persamaan perakaunan asas dengan betul?",
    optionsEn: [
      "Assets = Liabilities − Equity",
      "Assets = Liabilities + Equity",
      "Liabilities = Assets + Equity",
      "Equity = Assets + Liabilities",
    ],
    optionsMs: [
      "Aset = Liabiliti − Ekuiti",
      "Aset = Liabiliti + Ekuiti",
      "Liabiliti = Aset + Ekuiti",
      "Ekuiti = Aset + Liabiliti",
    ],
    answerKey: "1",
    explanationEn: "The accounting equation is Assets = Liabilities + Equity. Every transaction must preserve this balance — that is why every journal entry has equal debits and credits.",
    explanationMs: "Persamaan perakaunan ialah Aset = Liabiliti + Ekuiti. Setiap urus niaga mesti mengekalkan keseimbangan ini — sebab itulah setiap entri jurnal mempunyai debit dan kredit yang sama.",
  },
  {
    type: "mcq", lessonSlug: "accounting-equation", difficulty: "beginner", points: 1,
    promptEn: "Aisha invests RM10,000 cash into her business. What is the effect on the accounting equation?",
    promptMs: "Aishah melabur RM10,000 tunai ke dalam perniagaannya. Apakah kesannya terhadap persamaan perakaunan?",
    optionsEn: [
      "Assets increase; Equity increases",
      "Assets increase; Liabilities increase",
      "Assets decrease; Equity increases",
      "No effect — only cash changes form",
    ],
    optionsMs: [
      "Aset meningkat; Ekuiti meningkat",
      "Aset meningkat; Liabiliti meningkat",
      "Aset berkurang; Ekuiti meningkat",
      "Tiada kesan — hanya tunai berubah bentuk",
    ],
    answerKey: "0",
    explanationEn: "Cash (an asset) increases by RM10,000 and Owner's Capital (equity) increases by the same amount. The equation stays balanced: 10,000 = 0 + 10,000.",
    explanationMs: "Tunai (aset) meningkat sebanyak RM10,000 dan Modal Pemilik (ekuiti) meningkat dengan jumlah yang sama. Persamaan kekal seimbang: 10,000 = 0 + 10,000.",
  },
  {
    type: "mcq", lessonSlug: "accounting-equation", difficulty: "intermediate", points: 2,
    promptEn: "A business buys equipment for RM3,500 cash. What is the effect?",
    promptMs: "Perniagaan membeli peralatan dengan RM3,500 tunai. Apakah kesannya?",
    optionsEn: [
      "Total assets increase by RM3,500",
      "Total assets decrease by RM3,500",
      "Total assets are unchanged; only the mix of assets changes",
      "Equity decreases by RM3,500",
    ],
    optionsMs: [
      "Jumlah aset meningkat sebanyak RM3,500",
      "Jumlah aset berkurang sebanyak RM3,500",
      "Jumlah aset tidak berubah; hanya campuran aset berubah",
      "Ekuiti berkurang sebanyak RM3,500",
    ],
    answerKey: "2",
    explanationEn: "Equipment (asset) increases by RM3,500 and Cash (asset) decreases by RM3,500. The two effects cancel out — total assets are unchanged, liabilities and equity are unchanged.",
    explanationMs: "Peralatan (aset) meningkat sebanyak RM3,500 dan Tunai (aset) berkurang sebanyak RM3,500. Dua kesan ini saling membatalkan — jumlah aset tidak berubah, liabiliti dan ekuiti tidak berubah.",
  },
  {
    type: "mcq", lessonSlug: "debits-and-credits", difficulty: "beginner", points: 1,
    promptEn: "Which of the following accounts has a normal debit balance?",
    promptMs: "Akaun manakah yang mempunyai baki normal debit?",
    optionsEn: ["Cash", "Accounts Payable", "Owner's Capital", "Sales Revenue"],
    optionsMs: ["Tunai", "Akaun Belum Bayar", "Modal Pemilik", "Hasil Jualan"],
    answerKey: "0",
    explanationEn: "Assets (like Cash) carry a normal debit balance. Liabilities, equity, and revenue all carry a normal credit balance.",
    explanationMs: "Aset (seperti Tunai) mempunyai baki normal debit. Liabiliti, ekuiti, dan hasil semuanya mempunyai baki normal kredit.",
  },
  {
    type: "mcq", lessonSlug: "debits-and-credits", difficulty: "beginner", points: 1,
    promptEn: "To DECREASE Accounts Payable (a liability), you would:",
    promptMs: "Untuk MENGURANGKAN Akaun Belum Bayar (liabiliti), anda akan:",
    optionsEn: ["Debit it", "Credit it", "Do nothing — liabilities only increase", "Add it to equity"],
    optionsMs: ["Debitkannya", "Kreditkannya", "Tidak buat apa-apa — liabiliti hanya meningkat", "Tambahkannya ke ekuiti"],
    answerKey: "0",
    explanationEn: "Liabilities have a normal credit balance. To decrease any account, you record on the opposite side — so you debit a liability to decrease it.",
    explanationMs: "Liabiliti mempunyai baki normal kredit. Untuk mengurangkan akaun, anda rekod di sebelah bertentangan — jadi anda debit liabiliti untuk mengurangkannya.",
  },
  {
    type: "journal", lessonSlug: "debits-and-credits", difficulty: "intermediate", points: 2,
    promptEn: "The business pays RM1,200 cash for office rent. Which journal entry is correct?",
    promptMs: "Perniagaan membayar RM1,200 tunai untuk sewa pejabat. Entri jurnal manakah yang betul?",
    optionsEn: [
      "Debit Cash 1,200 / Credit Rent Expense 1,200",
      "Debit Rent Expense 1,200 / Credit Cash 1,200",
      "Debit Rent Expense 1,200 / Credit Accounts Payable 1,200",
      "Debit Cash 1,200 / Credit Rent Payable 1,200",
    ],
    optionsMs: [
      "Debit Tunai 1,200 / Kredit Perbelanjaan Sewa 1,200",
      "Debit Perbelanjaan Sewa 1,200 / Kredit Tunai 1,200",
      "Debit Perbelanjaan Sewa 1,200 / Kredit Akaun Belum Bayar 1,200",
      "Debit Tunai 1,200 / Kredit Sewa Belum Bayar 1,200",
    ],
    answerKey: "1",
    explanationEn: "Rent Expense (expense, normal debit) increases — debit it. Cash (asset, normal debit) decreases — credit it. The correct entry is Debit Rent Expense 1,200 / Credit Cash 1,200.",
    explanationMs: "Perbelanjaan Sewa (perbelanjaan, normal debit) meningkat — debit. Tunai (aset, normal debit) berkurang — kredit. Entri yang betul ialah Debit Perbelanjaan Sewa 1,200 / Kredit Tunai 1,200.",
  },
  {
    type: "mcq", lessonSlug: "debits-and-credits", difficulty: "advanced", points: 3,
    promptEn: "Accumulated Depreciation is a contra-asset. What is its normal balance?",
    promptMs: "Susut Nilai Terkumpul ialah akaun kontra aset. Apakah baki normalnya?",
    optionsEn: ["Debit", "Credit", "Either — it depends on the asset", "Zero — it's a temporary account"],
    optionsMs: ["Debit", "Kredit", "Sama ada — bergantung pada aset", "Sifar — ia akaun sementara"],
    answerKey: "1",
    explanationEn: "Contra accounts sit on the opposite side of their parent category. Since assets have a normal debit balance, Accumulated Depreciation (a contra-asset) has a normal credit balance. It is reported as a deduction from the related asset on the balance sheet.",
    explanationMs: "Akaun kontra berada di sebelah bertentangan kategori induknya. Oleh sebab aset mempunyai baki normal debit, Susut Nilai Terkumpul (kontra aset) mempunyai baki normal kredit. Ia dilaporkan sebagai tolakan daripada aset berkaitan pada kunci kira-kira.",
  },
  {
    type: "journal", lessonSlug: "journal-entries", difficulty: "intermediate", points: 2,
    promptEn: "ABC Trading purchases RM8,000 of inventory on credit (30-day terms). The correct entry is:",
    promptMs: "ABC Trading membeli inventori RM8,000 secara kredit (syarat 30 hari). Entri yang betul ialah:",
    optionsEn: [
      "Debit Inventory 8,000 / Credit Accounts Payable 8,000",
      "Debit Accounts Payable 8,000 / Credit Inventory 8,000",
      "Debit Cash 8,000 / Credit Inventory 8,000",
      "Debit Inventory 8,000 / Credit Cash 8,000",
    ],
    optionsMs: [
      "Debit Inventori 8,000 / Kredit Akaun Belum Bayar 8,000",
      "Debit Akaun Belum Bayar 8,000 / Kredit Inventori 8,000",
      "Debit Tunai 8,000 / Kredit Inventori 8,000",
      "Debit Inventori 8,000 / Kredit Tunai 8,000",
    ],
    answerKey: "0",
    explanationEn: "Inventory (asset) increases — debit. Accounts Payable (liability) increases — credit. Buying on credit means we owe the supplier, so we credit Accounts Payable, not Cash.",
    explanationMs: "Inventori (aset) meningkat — debit. Akaun Belum Bayar (liabiliti) meningkat — kredit. Beli secara kredit bermaksud kita berhutang kepada pembekal, jadi kita kredit Akaun Belum Bayar, bukan Tunai.",
  },
  {
    type: "journal", lessonSlug: "journal-entries", difficulty: "advanced", points: 3,
    promptEn: "A business buys equipment for RM5,000, paying RM2,000 cash and signing a note for RM3,000. The correct entry is:",
    promptMs: "Perniagaan membeli peralatan RM5,000, membayar RM2,000 tunai dan menandatangani wesel untuk RM3,000. Entri yang betul ialah:",
    optionsEn: [
      "Debit Equipment 5,000 / Credit Cash 2,000 / Credit Notes Payable 3,000",
      "Debit Equipment 5,000 / Credit Cash 5,000",
      "Debit Cash 2,000 / Debit Notes Payable 3,000 / Credit Equipment 5,000",
      "Debit Equipment 2,000 / Debit Notes Payable 3,000 / Credit Cash 5,000",
    ],
    optionsMs: [
      "Debit Peralatan 5,000 / Kredit Tunai 2,000 / Kredit Wesel Bayar 3,000",
      "Debit Peralatan 5,000 / Kredit Tunai 5,000",
      "Debit Tunai 2,000 / Debit Wesel Bayar 3,000 / Kredit Peralatan 5,000",
      "Debit Peralatan 2,000 / Debit Wesel Bayar 3,000 / Kredit Tunai 5,000",
    ],
    answerKey: "0",
    explanationEn: "Equipment (asset) increases by the full cost 5,000 — debit. Cash (asset) decreases by 2,000 — credit. Notes Payable (liability) increases by 3,000 — credit. Total debits (5,000) = total credits (2,000 + 3,000). This is a compound entry.",
    explanationMs: "Peralatan (aset) meningkat dengan kos penuh 5,000 — debit. Tunai (aset) berkurang 2,000 — kredit. Wesel Bayar (liabiliti) meningkat 3,000 — kredit. Jumlah debit (5,000) = jumlah kredit (2,000 + 3,000). Ini adalah entri kompaun.",
  },
  {
    type: "classify", lessonSlug: "journal-entries", difficulty: "intermediate", points: 2,
    promptEn: "On 4 February, ABC pays Supplier XYZ in full for the January credit purchase. Which accounts are affected?",
    promptMs: "Pada 4 Februari, ABC membayar Pembekal XYZ secara penuh untuk pembelian kredit Januari. Akaun manakah yang terjejas?",
    optionsEn: [
      "Accounts Payable decreases (debit); Cash decreases (credit)",
      "Accounts Payable increases (credit); Cash decreases (credit)",
      "Inventory decreases (debit); Cash decreases (credit)",
      "Accounts Receivable decreases (debit); Cash increases (debit)",
    ],
    optionsMs: [
      "Akaun Belum Bayar berkurang (debit); Tunai berkurang (kredit)",
      "Akaun Belum Bayar meningkat (kredit); Tunai berkurang (kredit)",
      "Inventori berkurang (debit); Tunai berkurang (kredit)",
      "Akaun Belum Terima berkurang (debit); Tunai meningkat (debit)",
    ],
    answerKey: "0",
    explanationEn: "Paying a supplier reduces what we owe them — Accounts Payable (liability, normal credit) decreases, so we debit it. Cash (asset, normal debit) decreases, so we credit it.",
    explanationMs: "Membayar pembekal mengurangkan apa yang kita hutang mereka — Akaun Belum Bayar (liabiliti, normal kredit) berkurang, jadi kita debit. Tunai (aset, normal debit) berkurang, jadi kita kredit.",
  },
  {
    type: "mcq", lessonSlug: "ledger-taccounts", difficulty: "intermediate", points: 2,
    promptEn: "After posting, Cash has total debits of RM12,500 and total credits of RM4,700. The ending balance is:",
    promptMs: "Selepas mempos, Tunai mempunyai jumlah debit RM12,500 dan jumlah kredit RM4,700. Baki akhir ialah:",
    optionsEn: [
      "RM7,800 debit",
      "RM7,800 credit",
      "RM17,200 debit",
      "RM4,700 debit",
    ],
    optionsMs: [
      "RM7,800 debit",
      "RM7,800 kredit",
      "RM17,200 debit",
      "RM4,700 debit",
    ],
    answerKey: "0",
    explanationEn: "For an asset like Cash (normal debit balance), ending balance = total debits − total credits = 12,500 − 4,700 = RM7,800 debit. This appears as a debit on the trial balance.",
    explanationMs: "Untuk aset seperti Tunai (baki normal debit), baki akhir = jumlah debit − jumlah kredit = 12,500 − 4,700 = RM7,800 debit. Ini muncul sebagai debit pada imbangan ujian.",
  },
  {
    type: "mcq", lessonSlug: "ledger-taccounts", difficulty: "intermediate", points: 2,
    promptEn: "If an asset account shows total credits greater than total debits, the account has:",
    promptMs: "Jika akaun aset menunjukkan jumlah kredit lebih besar daripada jumlah debit, akaun tersebut mempunyai:",
    optionsEn: [
      "An abnormal balance (credit) — usually an error",
      "A normal balance — assets can have either side",
      "Zero balance",
      "A negative liability",
    ],
    optionsMs: [
      "Baki tidak normal (kredit) — biasanya ralat",
      "Baki normal — aset boleh ada di mana-mana sisi",
      "Baki sifar",
      "Liabiliti negatif",
    ],
    answerKey: "0",
    explanationEn: "Assets normally have a debit balance. If credits exceed debits, the account has an abnormal balance — almost always a sign of an error (e.g., a debit posted as a credit) or an unusual transaction like a bank overdraft or refund.",
    explanationMs: "Aset biasanya mempunyai baki debit. Jika kredit melebihi debit, akaun mempunyai baki tidak normal — hampir selalu tanda ralat (contohnya, debit dipos sebagai kredit) atau urus niaga luar biasa seperti overdraf bank atau bayaran balik.",
  },
  {
    type: "mcq", lessonSlug: "trial-balance", difficulty: "beginner", points: 1,
    promptEn: "The purpose of a trial balance is to:",
    promptMs: "Tujuan imbangan ujian ialah untuk:",
    optionsEn: [
      "Verify that total debits equal total credits",
      "Calculate net profit for the period",
      "List all transactions in date order",
      "Reconcile the bank statement",
    ],
    optionsMs: [
      "Mengesahkan bahawa jumlah debit sama dengan jumlah kredit",
      "Mengira keuntungan bersih untuk tempoh tersebut",
      "Menyenaraikan semua urus niaga mengikut urutan tarikh",
      "Menyelaras penyata bank",
    ],
    answerKey: "0",
    explanationEn: "The trial balance is a list of all accounts with their balances, used to verify that total debits equal total credits. It is the first mathematical check after posting to the ledger.",
    explanationMs: "Imbangan ujian ialah senarai semua akaun dengan bakinya, digunakan untuk mengesahkan bahawa jumlah debit sama dengan jumlah kredit. Ia adalah semakan matematik pertama selepas mempos ke lejar.",
  },
  {
    type: "mcq", lessonSlug: "trial-balance", difficulty: "advanced", points: 3,
    promptEn: "A trial balance is out of balance by RM360. Dividing 360 by 9 gives 40 evenly. This suggests:",
    promptMs: "Imbangan ujian tidak seimbang sebanyak RM360. Membahagikan 360 dengan 9 memberikan 40 secara sekata. Ini mencadangkan:",
    optionsEn: [
      "A transposition error (e.g., 73 written as 37)",
      "A missed posting entirely",
      "An error of principle",
      "An entry recorded on the wrong side only",
    ],
    optionsMs: [
      "Ralat tersalah tukar digit (contohnya, 73 ditulis sebagai 37)",
      "Pos tertinggal sepenuhnya",
      "Ralat prinsip",
      "Entri direkod di sebelah salah sahaja",
    ],
    answerKey: "0",
    explanationEn: "If a number is divisible by 9, look for a transposition (two digits swapped). The difference between a number and its transposition is always divisible by 9. (73 − 37 = 36, divisible by 9.)",
    explanationMs: "Jika nombor boleh dibahagikan dengan 9, cari tersalah tukar digit (dua digit bertukar tempat). Perbezaan antara nombor dan tersalah tukarnya sentiasa boleh dibahagikan dengan 9. (73 − 37 = 36, boleh dibahagikan dengan 9.)",
  },
  {
    type: "mcq", lessonSlug: "trial-balance", difficulty: "intermediate", points: 2,
    promptEn: "Which error will NOT be detected by a trial balance?",
    promptMs: "Ralat manakah yang TIDAK akan dikesan oleh imbangan ujian?",
    optionsEn: [
      "A debit posted as a credit (one side only)",
      "An entry where the debit was for RM100 but the credit was for RM10",
      "A transaction not recorded at all (complete omission)",
      "Forgetting to post the credit side of an entry",
    ],
    optionsMs: [
      "Debit dipos sebagai kredit (sebelah sahaja)",
      "Entri di mana debit RM100 tetapi kredit RM10",
      "Urus niaga tidak direkod langsung (tertinggal sepenuhnya)",
      "Terlupa mempos sebelah kredit entri",
    ],
    answerKey: "2",
    explanationEn: "A complete omission affects no account, so the trial balance stays balanced. The trial balance only catches mathematical imbalances, not errors of omission, principle, or commission.",
    explanationMs: "Tertinggal sepenuhnya tidak mempengaruhi mana-mana akaun, jadi imbangan ujian kekal seimbang. Imbangan ujian hanya menangkap ketidakseimbangan matematik, bukan ralat tertinggal, prinsip, atau suruhanjaya.",
  },
  {
    type: "mcq", lessonSlug: "financial-statements", difficulty: "beginner", points: 1,
    promptEn: "Which financial statement reports revenue minus expenses for a period?",
    promptMs: "Penyata kewangan manakah yang melaporkan hasil tolak perbelanjaan untuk suatu tempoh?",
    optionsEn: ["Income Statement", "Balance Sheet", "Cash Flow Statement", "Statement of Changes in Equity"],
    optionsMs: ["Penyata Pendapatan", "Kunci Kira-Kira", "Penyata Aliran Tunai", "Penyata Perubahan Ekuiti"],
    answerKey: "0",
    explanationEn: "The Income Statement (also called Profit & Loss) reports revenue minus expenses, yielding net profit or loss for the period. It is the first statement prepared because net profit flows into equity.",
    explanationMs: "Penyata Pendapatan (juga dipanggil Untung & Rugi) melaporkan hasil tolak perbelanjaan, menghasilkan keuntungan atau kerugian bersih untuk tempoh tersebut. Ia adalah penyata pertama disediakan kerana keuntungan bersih mengalir ke ekuiti.",
  },
  {
    type: "mcq", lessonSlug: "financial-statements", difficulty: "intermediate", points: 2,
    promptEn: "In what order should the three linked statements be prepared?",
    promptMs: "Dalam urutan apaakah tiga penyata berkaitan harus disediakan?",
    optionsEn: [
      "Income Statement → Statement of Changes in Equity → Balance Sheet",
      "Balance Sheet → Income Statement → Statement of Changes in Equity",
      "Statement of Changes in Equity → Income Statement → Balance Sheet",
      "Any order — they are independent",
    ],
    optionsMs: [
      "Penyata Pendapatan → Penyata Perubahan Ekuiti → Kunci Kira-Kira",
      "Kunci Kira-Kira → Penyata Pendapatan → Penyata Perubahan Ekuiti",
      "Penyata Perubahan Ekuiti → Penyata Pendapatan → Kunci Kira-Kira",
      "Sebarang urutan — ia bebas",
    ],
    answerKey: "0",
    explanationEn: "Net profit from the Income Statement flows into the Statement of Changes in Equity; ending equity from that flows into the Balance Sheet. Preparing them out of order leaves you unable to complete the chain.",
    explanationMs: "Keuntungan bersih dari Penyata Pendapatan mengalir ke Penyata Perubahan Ekuiti; baki ekuiti akhir dari itu mengalir ke Kunci Kira-Kira. Menyediakannya tidak mengikut urutan meninggalkan anda tidak boleh menyelesaikan rantaian.",
  },
  {
    type: "mcq", lessonSlug: "financial-statements", difficulty: "advanced", points: 3,
    promptEn: "If net profit is RM1,300, owner investment is RM10,000, drawings are RM500, and beginning equity is RM0, ending equity is:",
    promptMs: "Jika keuntungan bersih RM1,300, pelaburan pemilik RM10,000, pengeluaran RM500, dan ekuiti awal RM0, baki ekuiti akhir ialah:",
    optionsEn: ["RM10,800", "RM11,800", "RM10,300", "RM9,200"],
    optionsMs: ["RM10,800", "RM11,800", "RM10,300", "RM9,200"],
    answerKey: "0",
    explanationEn: "Ending Equity = Beginning Equity + Owner Investment + Net Profit − Drawings = 0 + 10,000 + 1,300 − 500 = RM10,800. This amount appears in the equity section of the Balance Sheet.",
    explanationMs: "Ekuiti Akhir = Ekuiti Awal + Pelaburan Pemilik + Keuntungan Bersih − Pengeluaran = 0 + 10,000 + 1,300 − 500 = RM10,800. Jumlah ini muncul dalam bahagian ekuiti Kunci Kira-Kira.",
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  await db.quizAttempt.deleteMany();
  await db.lessonProgress.deleteMany();
  await db.practiceRecord.deleteMany();
  await db.lessonSection.deleteMany();
  await db.quizQuestion.deleteMany();
  await db.lesson.deleteMany();
  await db.account.deleteMany();
  await db.student.deleteMany();

  const student = await db.student.create({
    data: { id: "student-demo", displayName: "Demo Student", studentId: "DEMO0001" },
  });

  for (const a of accounts) {
    await db.account.create({ data: a });
  }

  for (const ls of lessons) {
    const lesson = await db.lesson.create({
      data: {
        slug: ls.slug, order: ls.order,
        titleEn: ls.titleEn, titleMs: ls.titleMs,
        summaryEn: ls.summaryEn, summaryMs: ls.summaryMs,
        icon: ls.icon, durationMin: ls.durationMin,
      },
    });
    for (let i = 0; i < ls.sections.length; i++) {
      const s = ls.sections[i];
      await db.lessonSection.create({
        data: {
          lessonId: lesson.id, order: i, type: s.type,
          titleEn: s.titleEn, titleMs: s.titleMs,
          bodyEn: s.bodyEn, bodyMs: s.bodyMs,
          payload: s.payload ? JSON.stringify(s.payload) : null,
        },
      });
    }
    await db.lessonProgress.create({
      data: { studentId: student.id, lessonId: lesson.id, status: "not_started", completionPct: 0 },
    });
  }

  for (const q of questions) {
    const lesson = q.lessonSlug ? await db.lesson.findUnique({ where: { slug: q.lessonSlug } }) : null;
    await db.quizQuestion.create({
      data: {
        lessonId: lesson?.id ?? null, type: q.type,
        promptEn: q.promptEn, promptMs: q.promptMs,
        optionsEn: JSON.stringify(q.optionsEn), optionsMs: JSON.stringify(q.optionsMs),
        answerKey: q.answerKey,
        explanationEn: q.explanationEn, explanationMs: q.explanationMs,
        difficulty: q.difficulty, points: q.points ?? 1,
      },
    });
  }

  console.log(`✅ Seeded ${accounts.length} accounts, ${lessons.length} lessons, ${questions.length} questions.`);
  console.log(`✅ Default student created: ${student.id}`);
}

main()
  .catch((e) => { console.error("❌ Seed failed:", e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
