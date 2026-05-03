export function formatInquiryDate(value) {
  if (!value) {
    return "No date";
  }

  try {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function formatShortDate(value) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(value);
  } catch {
    return "";
  }
}

export function getDateKey(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toISOString().slice(0, 10);
}

export function getInitials(value) {
  const parts = String(value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return "NA";
  }

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function truncateText(value, maxLength = 84) {
  const text = String(value || "").trim();

  if (!text) {
    return "No message provided.";
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}

export function filterInquiriesByQuery(inquiries, query) {
  const trimmedQuery = String(query || "").trim().toLowerCase();

  if (!trimmedQuery) {
    return inquiries;
  }

  return inquiries.filter((inquiry) =>
    [
      inquiry.full_name,
      inquiry.company_name,
      inquiry.email,
      inquiry.contact_number,
      inquiry.selected_service,
      inquiry.message,
    ].some((field) =>
      String(field || "").toLowerCase().includes(trimmedQuery)
    )
  );
}

export function getUniqueServiceCount(inquiries) {
  return new Set(
    inquiries
      .map((inquiry) => String(inquiry.selected_service || "").trim())
      .filter(Boolean)
  ).size;
}

export function getCompanyLeadCount(inquiries) {
  return inquiries.filter((inquiry) =>
    String(inquiry.company_name || "").trim()
  ).length;
}

export function getUniqueCompanyCount(inquiries) {
  return new Set(
    inquiries
      .map((inquiry) => String(inquiry.company_name || "").trim().toLowerCase())
      .filter(Boolean)
  ).size;
}

export function getRecentSevenDayCount(inquiries) {
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 7);

  return inquiries.filter((inquiry) => {
    const createdAt = new Date(inquiry.created_at);

    if (Number.isNaN(createdAt.getTime())) {
      return false;
    }

    return createdAt >= sevenDaysAgo && createdAt <= now;
  }).length;
}

export function getLatestSubmissionLabel(inquiries) {
  return inquiries[0]?.created_at
    ? formatInquiryDate(inquiries[0].created_at)
    : "No inquiries yet";
}

export function buildTrendData(inquiries) {
  const end = new Date();
  end.setUTCHours(0, 0, 0, 0);

  const counts = new Map();

  for (const inquiry of inquiries) {
    const key = getDateKey(inquiry.created_at);

    if (!key) {
      continue;
    }

    counts.set(key, (counts.get(key) ?? 0) + 1);
  }

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(end);
    date.setUTCDate(end.getUTCDate() - (6 - index));

    const key = date.toISOString().slice(0, 10);

    return {
      key,
      label: formatShortDate(date),
      count: counts.get(key) ?? 0,
    };
  });
}

function toStartOfDay(date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function toEndOfDay(date) {
  const value = new Date(date);
  value.setHours(23, 59, 59, 999);
  return value;
}

function startOfWeek(date) {
  const value = toStartOfDay(date);
  const day = value.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  value.setDate(value.getDate() + diff);
  return value;
}

function monthKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function weekKey(date) {
  return getDateKey(startOfWeek(date));
}

function formatMonthLabel(date) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return "";
  }
}

function formatWeekLabel(date) {
  const start = startOfWeek(date);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  try {
    const startLabel = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(start);
    const endLabel = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(end);

    return `${startLabel} - ${endLabel}`;
  } catch {
    return "";
  }
}

export function buildTrendSeries(
  inquiries,
  mode = "daily",
  customStart = "",
  customEnd = ""
) {
  const now = new Date();

  if (mode === "custom") {
    if (!customStart || !customEnd) {
      return [];
    }

    const start = toStartOfDay(new Date(customStart));
    const end = toEndOfDay(new Date(customEnd));

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
      return [];
    }

    const counts = new Map();

    for (const inquiry of inquiries) {
      const createdAt = new Date(inquiry.created_at);

      if (Number.isNaN(createdAt.getTime()) || createdAt < start || createdAt > end) {
        continue;
      }

      const key = getDateKey(createdAt);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    const points = [];
    for (const cursor = new Date(start); cursor <= end; cursor.setDate(cursor.getDate() + 1)) {
      const key = getDateKey(cursor);
      points.push({
        key,
        label: formatShortDate(cursor),
        count: counts.get(key) ?? 0,
      });
    }

    return points;
  }

  if (mode === "weekly") {
    const counts = new Map();
    const currentWeekStart = startOfWeek(now);

    for (const inquiry of inquiries) {
      const createdAt = new Date(inquiry.created_at);
      if (Number.isNaN(createdAt.getTime())) {
        continue;
      }

      const key = weekKey(createdAt);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    return Array.from({ length: 8 }, (_, index) => {
      const start = new Date(currentWeekStart);
      start.setDate(currentWeekStart.getDate() - (7 - index) * 7);
      const key = getDateKey(start);

      return {
        key,
        label: formatWeekLabel(start),
        count: counts.get(key) ?? 0,
      };
    });
  }

  if (mode === "monthly") {
    const counts = new Map();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    for (const inquiry of inquiries) {
      const createdAt = new Date(inquiry.created_at);
      if (Number.isNaN(createdAt.getTime())) {
        continue;
      }

      const key = monthKey(createdAt);
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    return Array.from({ length: 6 }, (_, index) => {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - (5 - index), 1);
      const key = monthKey(date);

      return {
        key,
        label: formatMonthLabel(date),
        count: counts.get(key) ?? 0,
      };
    });
  }

  return buildTrendData(inquiries);
}

export function buildTrendGeometry(points) {
  const width = 760;
  const height = 250;
  const left = 28;
  const right = 24;
  const top = 24;
  const bottom = 34;
  const maxCount = Math.max(...points.map((point) => point.count), 1);
  const innerWidth = width - left - right;
  const innerHeight = height - top - bottom;

  const chartPoints = points.map((point, index) => {
    const x =
      left + (innerWidth * index) / Math.max(points.length - 1, 1);
    const y =
      top + innerHeight - (point.count / maxCount) * innerHeight;

    return {
      ...point,
      x,
      y,
    };
  });

  const linePath = chartPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
  const areaPath = `${linePath} L ${chartPoints.at(-1)?.x ?? width} ${
    height - bottom
  } L ${chartPoints[0]?.x ?? left} ${height - bottom} Z`;

  return {
    width,
    height,
    left,
    right,
    top,
    bottom,
    maxCount,
    chartPoints,
    linePath,
    areaPath,
  };
}
