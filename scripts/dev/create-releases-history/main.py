import subprocess
from collections import defaultdict

all_commits = []


def get_commits_from_scalingo(page: int = 1) -> list[str]:
    commits = []
    res = subprocess.run(
        [
            "scalingo",
            "--app",
            "aides-agri-prod",
            "deployments",
            "--per-page",
            "50",
            "--page",
            f"{page}",
        ],
        capture_output=True,
        text=True,
    )
    for line in res.stdout.split("\n"):
        if "│" not in line:
            continue
        commit = line.split("│")[5].strip()
        if commit == "GIT REF" or commit in commits:
            continue
        commits.append(commit)
    return commits


scalingo_page = 1
while commits := get_commits_from_scalingo(page=scalingo_page):
    scalingo_page += 1
    all_commits.extend(commits)

dates = defaultdict(list)
for commit in reversed(all_commits):
    result = subprocess.run(
        ["git", "show", commit, "--no-patch", "--format=%cs"],
        capture_output=True,
        text=True,
    )
    commit_date = result.stdout.strip()
    dates[commit_date].append(commit)

for release_date, commits in dates.items():
    for i, commit in enumerate(commits):
        release_name = f"{release_date}-{i + 1}"
        tag_name = f"release/{release_name}"
        print(f"Création du tag Git {tag_name} sur le commit {commit}")
        res = subprocess.run(["git", "tag", tag_name, commit])
        if res != 0:
            print("Le tag existe déjà, on saute ce commit")
            continue
        else:
            print("OK")
        print(f"Push vers Github du tag Git {tag_name}")
        subprocess.run(["git", "push", "origin", "--tags", tag_name])
        print(f"Création de la release Github {release_name}")
        subprocess.run(
            [
                "gh",
                "release",
                "create",
                tag_name,
                f"-t {release_name}",
                "--generate-notes",
            ]
        )
