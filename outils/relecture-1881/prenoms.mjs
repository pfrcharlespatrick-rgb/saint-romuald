// Prénoms classés par sexe, établis lors de la passe « sexe » de la division 2
// puis réutilisés comme filtre de détection sur la division 1.
// Un prénom absent des deux listes n'est pas concluant : on ne tranche pas.
export const MASCULINS = new Set(`Joseph Louis Pierre Thomas Edouard Arthur François George Georges William Alfred Napoléon Jean Ernest
John David James Robert Etienne Étienne Michel Augustin Ferdinand Charles Philippe Théophile J.Baptiste Octave
Malcolm Malcom Adélard Julien Albert F.Xavier Victor Honoré Baptiste Ignace Onésime Narcisse Jacob Elzéar Henry
Alexandre Léon Leon Benjamin Paul Moïse André Désiré Magloire Eusèbe Damase Abraham Isaïe Alphonse Achille
Théodore Félix Célestin Thomy Thommy Herménégilde Barthélemy Jules Patrick Hubert Antoine Jacques Jacque Raphaël
Ephrem Frédéric Frédérique Stanislas Nazaire Denis Israël Johnny Théodule Rémi Philias Jérôme Maxime Arsène Alexis
Alcide Cornelius Edgar Edgard Cléophas Amable Nelson Pitre Kenny Antime Anthime Casimir Andrew Edward Alan Daniel
Gédéon Calixte Wilbrode Procule Adolphe Peter Domenico Jérémie Léonard Xavier Emile Léophile Pantaléon Ludger
Ambroise Léonidas Vital Siméon Norbert Wilfrid Duncan Harry Gordon Anselme Isaac Odilon Policarpe Onésiphore
Adjutor Amédée Hugh Walter Wm.George Modeste Homère Delphis Elisé Sem Léo Adélard Olivier`.split(/\s+/).filter(Boolean));
export const FEMININS  = new Set(`Marie Emma Joséphine Mary Philomène Emélie Caroline Rose Catherine Hélène Elisabeth Malvina Georgiana
Georgianna Marguerite Rosalie Eléonore Louise Belzémire Belzémine Eva Célina Sarah Elise Esther Henriette Alice
Fleurida Adéline Sophie Clara Delvina Eugénie Anny Célanire Julie Jessie Anna Adèle Adélaïde Adéliade Adélina Luce
Aurélie Emilie Angèle Odile Delmia Virginie Delina Délina Antoinette Rebecca Elizabeth Jeanne Laura Odina Agathe
Léa Léocadie Geneviève Délia Délias Ernestine Victoria Angélique Angéline Aimée Thérèse Lucie Lucy Louisa Louisia
Suzanne Kate Eulalie Bella Elmire Elmira Elmina Célénire Celenire Cordelia Florence Céline Charlotte Eliza Maggie
Maggy Matilda Mathilda Stella Mélanie Albina Almanda Amanda Delphine Alzia Zorilla Eudoxie Ursule Wilfride Brigitte
Lilly Lilian Maud Mérance Léda Clarice Arthemise Blanche Fabiana Minnie Bibiane Bibianne Aurinda Clémire Alvina
Rufina Prudèle Anathasie Félicité Delima Délima Aldenna Jenie Jenny Jinny Zoé France Diana Régina Aldémia Bridget
Gracie Démerise Sydonie Cléara Ethel Athélie Brésile Pommela Maria Bourgette Fanny Elvira Julienne Fémie Elzine
Erminia Suana Monique Odéline Amy Azilda Lumina Victoire Euphémie Philomise Elmia Azélie Loveria Céleste Zelpha
Manilda Vitaline Aidé Elmma Delfine Caniette Elzida Melvina Zenaïde Anarie Sophia Denise Altania Cléonire Solfina
Eyzélia Alphonsina Alphonsine Melia Alexandriana Flore Elzélia Lucienne Apoline Célinda Antonia Cléa Olive Zélia
Célie Albertine Cécile Nathalie Emelda Elzelda Philippa Philisse Clémentina Sabine Isabella Ada Madeleine Exelia
Ezelia Aurore Odelina Béline Priscille Azémire Célanie Joséphte Alganita Elva Aldina Rufine Olive Adéline`.split(/\s+/).filter(Boolean));
export function sexeAttendu(prenom) {
  const tok = (prenom || '').trim().split(/\s+/)[0];
  if (MASCULINS.has(tok)) return 'M';
  if (FEMININS.has(tok))  return 'F';
  return null;
}
