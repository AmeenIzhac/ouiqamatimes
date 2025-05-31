import json

with open ("iqama_times_2025.txt", "r") as f:
    lines = f.readlines()

prayer_times = {}

month_map = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
             "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"}

for line in lines:
    parts = line.split()
    month = month_map[parts[0]]
    day_of_month = parts[1]
    ddmm_key = f"{day_of_month}{month}"

    times = {
        "Fajr": parts[3],
        "Dhuhr": parts[5],
        "Asr": parts[7],
        "Maghrib": parts[8],
        "Isha": parts[9]
    }
    prayer_times[ddmm_key] = times


with open("src/prayer_times.json", "w") as json_file:
    json.dump(prayer_times, json_file, indent=4)
