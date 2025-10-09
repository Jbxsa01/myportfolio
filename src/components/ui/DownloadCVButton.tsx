import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle } from 'lucide-react';
import { Button } from './button';
import { toast } from 'sonner';

const DownloadCVButton: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Utiliser l'URL complète pour s'assurer que le bon fichier est téléchargé
      const cvUrl = '/CV bjane Asmaa software engineer.pdf';
      
      // Vérifier si le fichier existe
      const response = await fetch(cvUrl);
      if (!response.ok) {
        throw new Error('Le fichier CV n\'est pas disponible');
      }

      // Récupérer le blob du fichier
      const blob = await response.blob();
      
      // Créer un lien temporaire pour le téléchargement
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'CV bjane Asmaa software engineer.pdf'; // Nom de fichier explicite
      
      // Déclencher le téléchargement
      document.body.appendChild(link);
      link.click();
      
      // Nettoyer
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Afficher le succès
      setShowSuccess(true);
      toast.success('CV téléchargé avec succès !');
      
      // Réinitialiser après 3 secondes
      setTimeout(() => {
        setShowSuccess(false);
        setIsDownloading(false);
      }, 3000);
    } catch (error) {
      console.error('Erreur lors du téléchargement:', error);
      toast.error('Erreur lors du téléchargement du CV. Veuillez réessayer.');
      setIsDownloading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isDownloading}
      className="relative group overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-primary/10"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
      
      <div className="relative flex items-center gap-2">
        {isDownloading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <Download size={20} />
          </motion.div>
        ) : showSuccess ? (
          <CheckCircle size={20} className="text-green-500" />
        ) : (
          <>
            <Download size={20} />
            <span>Télécharger CV</span>
          </>
        )}
      </div>
    </Button>
  );
};

export default DownloadCVButton; 