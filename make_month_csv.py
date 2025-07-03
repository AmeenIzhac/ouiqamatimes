import csv

def get_month_times(month): 
    with open("athan_times_2025.txt", "r") as file:
        athan_lines = file.readlines()
    with open("iqama_times_2025.txt", "r") as file:
        iqama_lines = file.readlines()

    with open(f"{month.lower()}_prayer_times_2025.csv", "w", newline='') as csvfile:
        writer = csv.writer(csvfile)

        writer.writerow([month.lower(), "weekday", "fajr", "sunrise", "zuhr", "asr1", "asr2", "maghrib", "isha", "", "fajr", "zuhr", "asr", "maghrib", "isha"])

        month_athan_lines = [line for line in athan_lines if line.split()[0].lower() == month.lower()]
        month_iqama_lines = [line for line in iqama_lines if line.split()[0].lower() == month.lower()]

        for i in range(len(month_athan_lines)):
            athan_times = month_athan_lines[i].split()
            iqama_times = month_iqama_lines[i].split()
            if athan_times[2] == "Fri":
                writer.writerow([str(int(athan_times[1])), athan_times[2], athan_times[3], athan_times[4], athan_times[5], athan_times[6], athan_times[7], athan_times[8], athan_times[9], "", iqama_times[3], iqama_times[5], iqama_times[7], iqama_times[8], iqama_times[9]])
            else:
                writer.writerow([str(int(athan_times[1])), athan_times[2], athan_times[3], athan_times[4], athan_times[5], athan_times[6], athan_times[7], athan_times[8], athan_times[9], "", "", "", "", iqama_times[8], ""])

get_month_times("jul")