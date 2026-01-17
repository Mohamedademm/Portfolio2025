# Feature: Notifications de Changement d'Adresse

## 📋 Vue d'ensemble
Système de notification automatique pour informer les administrateurs lorsqu'un utilisateur modifie son adresse.

## ✅ Statut: COMPLET

### Backend ✅
**Commit:** `562af02` - "Feature: Add address change notifications for admins - Backend complete"

#### Fichiers Créés
1. **backend/middleware/detectAddressChange.js**
   - Détecte les changements dans les champs d'adresse
   - Compare: address, city, postalCode
   - Retourne: `hasChanged` et détails des changements

#### Fichiers Modifiés
1. **backend/models/Notification.js**
   - Ajout champ `type`: enum ['general', 'address_change', 'department_update', 'system']
   - Ajout champ `metadata`: Mixed (pour stocker ancienne/nouvelle adresse)

2. **backend/controllers/userController.js** - `updateProfile()`
   - Détection automatique des changements d'adresse
   - Création de notifications pour tous les admins actifs
   - Émission Socket.IO vers les rooms admin
   - Retourne flag `addressChanged` dans la réponse

3. **backend/controllers/notificationController.js**
   - Méthode `getAdminNotifications()`
   - Filtres: `type` et `unreadOnly`
   - Retourne: liste + compteurs par type
   - Vérification rôle admin (403 si non autorisé)

4. **backend/routes/notificationRoutes.js**
   - Route: `GET /api/notifications/admin`
   - Query params: `type`, `unreadOnly`

#### API Endpoints
```
GET /api/notifications/admin
Query params:
  - type: string (optional) - 'address_change' | 'department_update' | 'system' | 'general'
  - unreadOnly: boolean (optional) - filter unread only

Response:
{
  "notifications": [...],
  "unreadCountsByType": {
    "address_change": 2,
    "general": 5,
    ...
  }
}
```

---

### Frontend ✅

#### Fichiers Créés
1. **flutter/lib/screens/admin/admin_notifications_screen.dart** (380 lignes)
   - Interface complète de gestion des notifications admin
   - 5 filtres par type avec badges de compteur
   - Toggle "Non lues uniquement"
   - Affichage spécial pour les métadonnées d'adresse
   - Marquer comme lu au tap
   - Pull-to-refresh
   - États vides et de chargement

#### Fichiers Modifiés
1. **flutter/lib/models/notification_model.dart**
   - Ajout champ `type` (String, default: 'general')
   - Ajout champ `metadata` (Map<String, dynamic>?)
   - Getter `isRead` pour vérification rapide
   - Parsing des nouveaux champs dans `fromJson`

2. **flutter/lib/services/notification_service.dart**
   - Méthode `getAdminNotifications({type, unreadOnly})`
   - Retourne: Map avec notifications + unreadCountsByType

3. **flutter/lib/screens/dashboard_screen.dart**
   - Ajout icône admin dans AppBar (admin_panel_settings_outlined)
   - Badge avec compteur de notifications non lues
   - Navigation vers AdminNotificationsScreen
   - Visible uniquement pour les admins (authProvider.isAdmin)

4. **flutter/lib/services/user_service.dart**
   - `updateUserProfile()` retourne maintenant un Map
   - Contient: `user` et `addressChanged` flag

5. **flutter/lib/screens/edit_profile_screen.dart**
   - Détection du flag `addressChanged` dans la réponse
   - Message différencié:
     - Si adresse changée: "Profil mis à jour! Les administrateurs ont été notifiés du changement d'adresse."
     - Sinon: "Profil mis à jour avec succès"
   - Durée du SnackBar adaptée (5s si adresse changée, 3s sinon)
   - Icône différenciée (notification_active vs check_circle)

---

## 🧪 Test Plan

### Test 1: Création de Notification
1. **Connexion Employé**
   - Email: employee@example.com
   - Password: Test123!

2. **Modification Adresse**
   - Aller dans Profil → Modifier
   - Changer: address, city ou postalCode
   - Sauvegarder

3. **Vérification Réponse**
   - ✅ Message: "Les administrateurs ont été notifiés..."
   - ✅ SnackBar bleu avec icône notification_active
   - ✅ Durée: 5 secondes

### Test 2: Réception Admin
1. **Connexion Admin**
   - Email: admin@example.com
   - Password: Admin123!

2. **Vérification Dashboard**
   - ✅ Icône admin visible (admin_panel_settings_outlined, couleur primaire)
   - ✅ Badge avec compteur > 0
   - ✅ Badge couleur primaire

3. **Ouvrir Notifications Admin**
   - Cliquer sur l'icône admin
   - ✅ Écran AdminNotificationsScreen s'ouvre

### Test 3: Interface Admin
1. **Vérification Filtres**
   - ✅ 5 chips visibles: Toutes, Changements d'adresse, Départements, Système, Général
   - ✅ Badge "Changements d'adresse" > 0
   - ✅ Cliquer filtre → liste filtrée

2. **Vérification Toggle**
   - ✅ Checkbox "Non lues uniquement"
   - ✅ Cocher → affiche uniquement non lues
   - ✅ Décocher → affiche toutes

3. **Vérification Card Notification**
   - ✅ Icône home_outlined + couleur orange
   - ✅ Titre: "Changement d'adresse"
   - ✅ Nom de l'utilisateur visible
   - ✅ Ancienne et nouvelle adresse affichées
   - ✅ Date au format "17 janv. 2026, 14:30"
   - ✅ Indicateur "Non lu" visible si non lue

4. **Marquer comme Lu**
   - ✅ Tap sur la card
   - ✅ Indicateur "Non lu" disparaît
   - ✅ Badge décrémente de 1

5. **Pull-to-Refresh**
   - ✅ Swipe down → rechargement
   - ✅ Spinner visible pendant chargement

### Test 4: Socket.IO Temps Réel
1. **Configuration**
   - Admin connecté + écran notifications ouvert
   - Employé connecté + page profil ouverte

2. **Action**
   - Employé change son adresse
   - Employé sauvegarde

3. **Vérification Admin (temps réel)**
   - ✅ Notification apparaît INSTANTANÉMENT (sans refresh)
   - ✅ Badge incrémente automatiquement
   - ✅ Son/vibration (si implémenté)

---

## 🔄 Workflow Complet

```
[Employé]                    [Backend]                    [Admin]
    |                            |                            |
    |-- Modifier Adresse ------->|                            |
    |                            |                            |
    |                        Détection                        |
    |                       changement                        |
    |                    (detectAddressChange)                |
    |                            |                            |
    |                      Créer notification                 |
    |                       pour admins                       |
    |                            |                            |
    |                       Socket.IO emit                    |
    |                     'admin-notification'                |
    |                            |---- Notification temps --->|
    |                            |         réel               |
    |<-- Réponse + flag ---------|                            |
    |    addressChanged          |                            |
    |                            |                            |
 Affiche message                 |                       Badge +1
  de confirmation                |                            |
                                 |                            |
                                 |                     Clic icône admin
                                 |                            |
                                 |<-- GET /notifications/ ----|
                                 |       admin?type=          |
                                 |    address_change          |
                                 |                            |
                                 |---- Liste notifications -->|
                                 |     + compteurs            |
                                 |                            |
                                 |                      Affiche liste
                                 |                            |
                                 |                       Clic card
                                 |                            |
                                 |<-- PUT /notifications/ ----|
                                 |       :id/read             |
                                 |                            |
                                 |---- Notification mise ---->|
                                 |     à jour (read=true)     |
                                 |                            |
                                 |                      Badge -1
```

---

## 📊 Métadonnées Notification

Format du champ `metadata` pour type `address_change`:
```json
{
  "oldAddress": {
    "address": "123 Rue Ancienne",
    "city": "Paris",
    "postalCode": "75001"
  },
  "newAddress": {
    "address": "456 Avenue Nouvelle",
    "city": "Lyon",
    "postalCode": "69001"
  }
}
```

---

## 🎨 UI/UX

### Couleurs par Type
- **address_change**: Orange (Icons.home_outlined)
- **department_update**: Blue (Icons.business_outlined)
- **system**: Red (Icons.warning_outlined)
- **general**: Grey (Icons.notifications_outlined)

### Badges
- Fond: Couleur du type
- Texte: Blanc, bold, 10px
- Max affichage: 99+

### Messages
| Contexte | Message |
|----------|---------|
| Adresse changée | "Profil mis à jour! Les administrateurs ont été notifiés du changement d'adresse." |
| Autres champs | "Profil mis à jour avec succès" |

---

## 🚀 Déploiement

### Backend
- ✅ Déployé sur Render
- ✅ Commit: `562af02`
- ✅ Testé: Middleware, Controller, Routes
- ✅ Socket.IO configuré

### Frontend
- ✅ Code complet
- ✅ Pas d'erreurs de compilation
- ✅ Navigation intégrée
- ⚠️ Test end-to-end à faire

---

## 📝 Prochaines Étapes

### Améliorations Futures (Optionnel)
1. **Notifications Push**
   - Firebase Cloud Messaging
   - Notifications même si app fermée

2. **Historique**
   - Archivage des anciennes notifications
   - Recherche dans l'historique

3. **Statistiques**
   - Dashboard admin avec graphiques
   - Nombre de changements d'adresse par mois

4. **Export**
   - Export CSV des notifications
   - Rapport PDF pour audit

---

## 👥 Rôles et Permissions

| Rôle | Permissions |
|------|-------------|
| **Employee** | Modifier son adresse → Crée notification |
| **Admin** | Voir toutes notifications admin, marquer comme lu |
| **Manager** | (Pas d'accès aux notifications admin pour l'instant) |

---

## 🐛 Debugging

### Backend Logs
```javascript
console.log('Address changed detected:', {
  userId,
  oldAddress,
  newAddress,
  adminCount
});
```

### Frontend Logs
```dart
print('Admin notifications loaded: ${notifications.length}');
print('Unread counts: $unreadCountsByType');
```

### Vérification Base de Données
```javascript
// Compter notifications d'un admin
db.notifications.countDocuments({
  userId: "admin_id_here",
  type: "address_change",
  read: false
});
```

---

## 📄 Documentation Associée
- [AMELIORATIONS_CHAT_GROUPE.md](./AMELIORATIONS_CHAT_GROUPE.md) - Plan global
- [README.md](./README.md) - Setup projet

---

**Date de Complétion:** 17 janvier 2026
**Développeur:** GitHub Copilot
**Statut:** ✅ FEATURE COMPLÈTE - Prête pour tests utilisateurs
