document.addEventListener('DOMContentLoaded', () => {
    const toggleIcon = document.getElementById('theme-switcher');
    const body = document.body;

    // Vérifie si un thème est déjà sélectionné et l'applique
    const currentTheme = localStorage.getItem('theme') || 'light-mode'; // Défaut au thème clair
    body.classList.add(currentTheme);

    toggleIcon.addEventListener('click', () => {
        if (body.classList.contains('light-mode')) {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            setTimeout(() => {
                toggleIcon.querySelector('img').src = "images/Sun_fill.svg"; // Icône pour activer le thème clair
            }, 300); // Délai pour permettre à l'animation d'opacité de se produire
            localStorage.setItem('theme', 'dark-mode');
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            setTimeout(() => {
                toggleIcon.querySelector('img').src = "images/Moon_fill.svg"; // Icône pour activer le thème sombre
            }, 300); // Délai pour permettre à l'animation d'opacité de se produire
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // Gestion de l'upload de fichiers
    document.getElementById('file-upload').addEventListener('change', function() {
        document.querySelector('.upload-box').classList.add('hidden');
        document.getElementById('uploading').classList.remove('hidden');

        setTimeout(() => {
            document.getElementById('uploading').classList.add('hidden');
            document.getElementById('uploaded').classList.remove('hidden');
            const uploadedImage = document.getElementById('uploaded-image');
            uploadedImage.src = URL.createObjectURL(this.files[0]);
            
            // Affiche les boutons d'action après le téléchargement de l'image
            document.querySelector('.action-buttons').classList.remove('hidden');
        }, 2000); // Simulation du délai d'upload
    });

    // Fonctionnalité du bouton Share
    document.querySelector('.btn.share').addEventListener('click', () => {
        const imageUrl = document.getElementById('uploaded-image').src;

        if (imageUrl) {
            // Copier l'URL de l'image dans le presse-papiers
            navigator.clipboard.writeText(imageUrl).then(() => {
                alert("The image link has been copied to the clipboard!");
            }).catch(err => {
                console.error("Erreur lors de la copie dans le presse-papiers:", err);
                alert("Error copying to clipboard!");
            });
        } else {
            alert("No images to share!");
        }
    });

    // Fonctionnalité du bouton Download
    document.querySelector('.btn.download').addEventListener('click', () => {
        const imageUrl = document.getElementById('uploaded-image').src;
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'uploaded-image'; // Nom du fichier téléchargé
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});
