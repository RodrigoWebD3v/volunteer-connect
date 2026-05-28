#!/usr/bin/env bash
set -euo pipefail

# ─── Colors & Styles ──────────────────────────────────────────────────────────
RESET='\033[0m'
BOLD='\033[1m'
DIM='\033[2m'

RED='\033[31m'
GREEN='\033[32m'
YELLOW='\033[33m'
BLUE='\033[34m'
MAGENTA='\033[35m'
CYAN='\033[36m'
WHITE='\033[37m'

# ─── Helpers ──────────────────────────────────────────────────────────────────
print_line() {
  printf "${DIM}${CYAN}  ─────────────────────────────────────────────────────${RESET}\n"
}

label() {
  local color=$1 icon=$2 text=$3
  printf "  ${color}${BOLD}${icon}  ${text}${RESET}\n"
}

status_row() {
  local lbl=$1 value=$2 color=${3:-$WHITE}
  printf "  ${DIM}${WHITE}%-14s${RESET} ${color}%s${RESET}\n" "$lbl" "$value"
}

# ─── Banner ───────────────────────────────────────────────────────────────────
clear

printf "\n"
printf "${BOLD}${CYAN}"
printf "  ██╗   ██╗ ██████╗ ██╗     ██╗   ██╗███╗   ██╗████████╗███████╗███████╗██████╗ \n"
printf "  ██║   ██║██╔═══██╗██║     ██║   ██║████╗  ██║╚══██╔══╝██╔════╝██╔════╝██╔══██╗\n"
printf "  ██║   ██║██║   ██║██║     ██║   ██║██╔██╗ ██║   ██║   █████╗  █████╗  ██████╔╝\n"
printf "  ╚██╗ ██╔╝██║   ██║██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██╔══╝  ██╔══██╗\n"
printf "   ╚████╔╝ ╚██████╔╝███████╗╚██████╔╝██║ ╚████║   ██║   ███████╗███████╗██║  ██║\n"
printf "    ╚═══╝   ╚═════╝ ╚══════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚══════╝╚═╝  ╚═╝\n"
printf "${RESET}"

printf "\n"
printf "  ${DIM}${WHITE}CONNECT  ${RESET}${BOLD}${MAGENTA}◆${RESET}  ${DIM}${WHITE}Ambiente de Desenvolvimento${RESET}\n"
printf "\n"
print_line
printf "\n"

# ─── Environment info ─────────────────────────────────────────────────────────
BACKEND_PORT=3000
FRONTEND_PORT=5173
NODE_VER=$(node --version 2>/dev/null || echo "não encontrado")
NPM_VER=$(npm --version 2>/dev/null || echo "não encontrado")

status_row "Node.js"   "$NODE_VER"                         "$GREEN"
status_row "npm"       "$NPM_VER"                          "$GREEN"
status_row "Backend"   "http://localhost:$BACKEND_PORT"    "$BLUE"
status_row "Frontend"  "http://localhost:$FRONTEND_PORT"   "$CYAN"

printf "\n"
print_line
printf "\n"

# ─── Pre-flight: check node_modules ───────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

check_deps() {
  local dir=$1 name=$2
  if [ ! -d "$dir/node_modules" ]; then
    label "$YELLOW" "⚠" "$name: instalando dependências..."
    npm --prefix "$dir" install --silent
    label "$GREEN" "✔" "$name: dependências prontas"
  fi
}

check_deps "$SCRIPT_DIR/backend"  "Backend"
check_deps "$SCRIPT_DIR/frontend" "Frontend"

printf "\n"

# ─── Trap cleanup ─────────────────────────────────────────────────────────────
cleanup() {
  printf "\n\n"
  print_line
  label "$YELLOW" "◉" "Encerrando ambientes..."
  kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
  wait "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true
  printf "\n"
  label "$MAGENTA" "✦" "Volunteer Connect — até logo!"
  printf "\n"
}
trap cleanup EXIT INT TERM

# ─── Launch ───────────────────────────────────────────────────────────────────
label "$BLUE"  "▶" "Iniciando Backend  (NestJS + watch)..."
npm --prefix "$SCRIPT_DIR/backend" run start:dev 2>&1 \
  | sed "s/^/  $(printf "${BLUE}[backend]${RESET} ")/" &
BACKEND_PID=$!

label "$CYAN" "▶" "Iniciando Frontend (SvelteKit + Vite)..."
npm --prefix "$SCRIPT_DIR/frontend" run dev 2>&1 \
  | sed "s/^/  $(printf "${CYAN}[frontend]${RESET}")/" &
FRONTEND_PID=$!

printf "\n"
print_line
printf "\n"
label "$GREEN" "✦" "Ambientes rodando — pressione ${BOLD}Ctrl+C${RESET}${GREEN} para encerrar"
printf "\n"

# ─── Wait ─────────────────────────────────────────────────────────────────────
wait "$BACKEND_PID" "$FRONTEND_PID"
