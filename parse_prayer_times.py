import json

prayer_times = {}

month_map = {"Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "May": "05", "Jun": "06",
             "Jul": "07", "Aug": "08", "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"}

with open ("athan_times_2025.txt", "r") as f:
    lines = f.readlines()

for line in lines:
    parts = line.split()
    month = month_map[parts[0]]
    day_of_month = parts[1]
    ddmm_key = f"{day_of_month}{month}"

    times = {
        "athan-fajr": parts[3],
        "athan-dhuhr": parts[5],
        "athan-asr": parts[7],
        "athan-maghrib": parts[8],
        "athan-isha": parts[9]
    }
    prayer_times[ddmm_key] = times

with open ("iqama_times_2025.txt", "r") as f:
    lines = f.readlines()

for line in lines:
    parts = line.split()
    month = month_map[parts[0]]
    day_of_month = parts[1]
    ddmm_key = f"{day_of_month}{month}"

    times = {
        "iqama-fajr": parts[3],
        "iqama-dhuhr": parts[5],
        "iqama-asr": parts[7],
        "iqama-maghrib": parts[8],
        "iqama-isha": parts[9]
    }
    prayer_times[ddmm_key].update(times)

with open("src/prayer_times.json", "w") as json_file:
    json.dump(prayer_times, json_file, indent=4)
