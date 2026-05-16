// js/config.js
const CONFIG = {
    APP_NAME: "Health Tracker",
    VERSION: "2.0.0",
    DB_NAME: "HealthTrackerDB",
    DB_VERSION: 1,
    DEFAULT_FIELDS: [
        "date", "time", "sys", "dia", "weightLbs", "steps",
        "spo2", "hr", "glucose", "pain", "symptoms", "comments"
    ]
};

window.CONFIG = CONFIG;
