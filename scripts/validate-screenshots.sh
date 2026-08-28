#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
checked=0
findings=()

while IFS= read -r -d '' image; do
    checked=$((checked + 1))
    read -r width height < <(identify -format '%w %h\n' "$image")
    if (( height < 500 )); then
        continue
    fi

    row="$({ convert "$image" -resize '1x!' txt:- || true; } | awk -F'[,:() ]+' -v height="$height" '
        $1 ~ /^[0-9]+$/ {
            y=$2; r=$3; g=$4; b=$5
            if (!found && y < height-180 && r >= 20 && r <= 45 && g >= 105 && g <= 145 && b >= 35 && b <= 75) {
                found=y
            }
        }
        END { if (found) print found }
    ' )"
    if [[ -z "$row" ]]; then
        continue
    fi

    top=$((row > 40 ? row - 40 : 0))
    crop_height=$((height - top > 180 ? 180 : height - top))
    text="$({ convert "$image" -crop "${width}x${crop_height}+0+${top}" png:- || true; } | tesseract stdin stdout -l eng 2>/dev/null || true)"
    if grep -Eiq 'cookie|privacy|respect|necessary|accept' <<<"$text"; then
        findings+=("${image#"$root/public/images/docs/"}: Cookie-/Datenschutzbalken bei Bildzeile $row")
    fi
done < <(find "$root/public/images/docs"/{de,en,fr,ru,zh-hans} -type f -name '*.png' -print0)

if (( ${#findings[@]} )); then
    printf '%s\n' "${findings[@]}" >&2
    exit 1
fi

printf 'Screenshot-Prüfung ohne Befund (%d PNG-Dateien geprüft).\n' "$checked"
