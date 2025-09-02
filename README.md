# Flask Realtime Shopping List

Une application web simple permettant de gérer une **liste de courses** collaborative en temps réel avec [Flask](https://flask.palletsprojects.com/) et [Flask-SocketIO](https://flask-socketio.readthedocs.io/).  
Les utilisateurs peuvent ajouter ou supprimer des articles et la liste se met automatiquement à jour pour tous les participants connectés.

---

## 🚀 Fonctionnalités

- Ajout et suppression d’articles dans la liste.
- Mise à jour **en temps réel** grâce à Socket.IO (synchronisation entre tous les clients connectés).
- Sauvegarde persistante des articles dans un fichier `data.json`.
- Interface simple avec `index.html`.

---

## 📦 Installation

### 1. Cloner le projet
```bash
git clone https://github.com/ton-utilisateur/ton-repo.git
cd ton-repo
```
### 2. Activer l'environement virtuel
```bash
python3 -m venv venv
source venv/bin/activate
pip install flask flask-socketio
```
