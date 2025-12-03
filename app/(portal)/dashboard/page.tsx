import styles from "./page.module.css";

type Status = "OPEN" | "IN_PROGRESS" | "RESOLVED";
type Priority = "LOW" | "MEDIUM" | "HIGH";

type Ticket = {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  created: string;
  updated: string;
};

const tickets: Ticket[] = [
  {
    id: "1234582",
    title: "1234582",
    status: "OPEN",
    priority: "MEDIUM",
    created: "Nov 14, 2025",
    updated: "Nov 16, 2025",
  },
  {
    id: "edrftgyhjn-1",
    title: "edrftgyhjn",
    status: "OPEN",
    priority: "MEDIUM",
    created: "Nov 16, 2025",
    updated: "Nov 16, 2025",
  },
  {
    id: "edrftgyhjn-2",
    title: "edrftgyhjn",
    status: "OPEN",
    priority: "MEDIUM",
    created: "Nov 16, 2025",
    updated: "Nov 16, 2025",
  },
  {
    id: "aeGRSTBDANF",
    title: "aeGRSTBDANF",
    status: "OPEN",
    priority: "MEDIUM",
    created: "Nov 16, 2025",
    updated: "Nov 16, 2025",
  },
  {
    id: "test-ticket",
    title: "este ticket es de pruebita",
    status: "OPEN",
    priority: "MEDIUM",
    created: "Nov 16, 2025",
    updated: "Nov 16, 2025",
  },
  {
    id: "wukbksv",
    title: "wukbksv",
    status: "OPEN",
    priority: "MEDIUM",
    created: "Nov 17, 2025",
    updated: "Nov 17, 2025",
  },
  {
    id: "345678",
    title: "345678",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    created: "Nov 14, 2025",
    updated: "Nov 16, 2025",
  },
  {
    id: "323456",
    title: "323456",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    created: "Nov 14, 2025",
    updated: "Nov 16, 2025",
  },
  {
    id: "123456",
    title: "123456",
    status: "RESOLVED",
    priority: "MEDIUM",
    created: "Nov 14, 2025",
    updated: "Nov 16, 2025",
  },
];

const getStatusLabel = (status: Status) => {
  if (status === "OPEN") return "Open";
  if (status === "IN_PROGRESS") return "In Progress";
  return "Resolved";
};

const getStatusClass = (status: Status) => {
  if (status === "OPEN") return styles.badgeStatusOpen;
  if (status === "IN_PROGRESS") return styles.badgeStatusInProgress;
  return styles.badgeStatusResolved;
};

const getPriorityLabel = (priority: Priority) => {
  if (priority === "LOW") return "Low";
  if (priority === "HIGH") return "High";
  return "Medium";
};

export default function SupportTicketsPage() {
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "OPEN").length;
  const inProgressTickets = tickets.filter(
    (t) => t.status === "IN_PROGRESS",
  ).length;
  const resolvedTickets = tickets.filter(
    (t) => t.status === "RESOLVED",
  ).length;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>My Support Tickets</h1>
          <p className={styles.subtitle}>Welcome</p>
        </div>

        <button
          type="button"
          className={styles.newTicketButton}
          aria-label="Create a new ticket"
        >
          <span className={styles.newTicketIcon}>＋</span>
          <span>New Ticket</span>
        </button>
      </header>

      <section className={styles.kpiRow}>
        <article className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Total Tickets</span>
          <span className={styles.kpiValue}>{totalTickets}</span>
        </article>

        <article className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Open</span>
          <span className={styles.kpiValue}>{openTickets}</span>
        </article>

        <article className={styles.kpiCard}>
          <span className={styles.kpiLabel}>In Progress</span>
          <span className={styles.kpiValue}>{inProgressTickets}</span>
        </article>

        <article className={styles.kpiCard}>
          <span className={styles.kpiLabel}>Resolved</span>
          <span className={styles.kpiValue}>{resolvedTickets}</span>
        </article>
      </section>

      <section className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.colTitle}>Title</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Created</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className={styles.row}>
                <td className={styles.cellTitle}>{ticket.title}</td>
                <td>
                  <span
                    className={`${styles.badge} ${getStatusClass(
                      ticket.status,
                    )}`}
                  >
                    {getStatusLabel(ticket.status)}
                  </span>
                </td>
                <td>
                  <span
                    className={`${styles.badge} ${styles.badgePriorityMedium}`}
                  >
                    {getPriorityLabel(ticket.priority)}
                  </span>
                </td>
                <td className={styles.cellDate}>
                  <span className={styles.clockIcon}>⏱</span>
                  <span>{ticket.created}</span>
                </td>
                <td className={styles.cellDate}>
                  <span>{ticket.updated}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
