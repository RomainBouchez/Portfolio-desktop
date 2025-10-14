export interface DockApp {
  id: string;
  name: string;
  iconPath: string; // Chemin vers l'image de l'icône
  type: 'link' | 'modal' | 'decorative'; // Type d'action au clic
  url?: string; // URL pour le type 'link'
  action?: string; // Identifiant d'action pour le type 'modal'
  isOpen?: boolean; // L'application est-elle ouverte ?
}

export const dockApps: DockApp[] = [
  {
    id: 'notes',
    name: 'À Propos', // On peut changer le nom pour qu'il soit plus descriptif
    iconPath: '/icon/a7761e81eb0637b0c29977f1a2519d8c_Notes.png',
    type: 'modal',
    action: 'openAbout', // Action pour ouvrir une fenêtre "À Propos"
    isOpen: false
  },
  {
    id: 'github',
    name: 'GitHub',
    iconPath: '/icon/8d7ab2987e56263c70c07b52d98467e2_GitHub.png',
    type: 'link',
    url: 'https://github.com/RomainBouchez',
    isOpen: false
  },
  {
    id: 'mail',
    name: 'Mail',
    iconPath: '/icon/e4103112ae11b62363404a82235c9fb5_1750791345890.png',
    type: 'link',
    url: 'mailto:bouchez@et.esiea.fr',
    isOpen: false
  },
  {
    id: 'terminal',
    name: 'Terminal',
    // J'ai mis à jour avec le bon chemin pour l'icône du terminal
    iconPath: '/icon/95813cf9f6cdd61b3b83f94f853ff2ee_Terminal__MacOS_Tahoe_.png',
    type: 'modal',
    action: 'openTerminal', // Action pour ouvrir un terminal factice
    isOpen: false
  },
  {
    id: 'vscode',
    name: 'VsCode', // On peut aussi changer ce nom
    iconPath: '/icon/f9d1a2c650ddccfef7b0ded444d54eb2_vscode.png',
    type: 'modal',
    action: 'openProjects', // Action pour ouvrir une fenêtre listant les projets
    isOpen: false
  }
];