CREATE DATABASE IF NOT EXISTS PLATEFORME CHARACTER SET UTF8mb4 COLLATE utf8mb4_bin;

CREATE TABLE IF NOT EXISTS PLATEFORME.AIDEFINANCIERE (
    identifiantAideFinanciere INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nomAideFinanciere VARCHAR(255),
    descriptionAideFinanciere TEXT,
    lienAideFinanciere VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CONTACT (
    identifiantContact INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nomContact VARCHAR(255),
    prenomContact VARCHAR(255),
    adresseMailContact VARCHAR(255),
    fonctionContact VARCHAR(255),
    estCoordinateur BOOLEAN
);

CREATE TABLE IF NOT EXISTS PLATEFORME.LOCALISATION (
    identifiantLocalisation INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    latitudeLocalisation VARCHAR(255),
    longitudeLocalisation VARCHAR(255),
    nomLocalisation VARCHAR(255),
    nomPaysLocalisation VARCHAR(255),
    codePaysLocalisation VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS PLATEFORME.MOBILITE (
    identifiantMobilite INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    typeMobilite VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS PLATEFORME.SPECIALITE (
    identifiantSpecialite INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nomSpecialite VARCHAR(255),
    couleurSpecialite VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS PLATEFORME.SOUSSPECIALITE (
    identifiantSousSpecialite INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nomSousSpecialite VARCHAR(255),
    identifiantSpecialite INT NOT NULL,
    FOREIGN KEY (identifiantSpecialite) REFERENCES SPECIALITE(identifiantSpecialite) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.FICHIERPARTENAIRE (
    identifiantFichierPartenaire INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    cheminFichierPartenaireServeur VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS PLATEFORME.COUT (
    identifiantCout INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nomPaysCout VARCHAR(255),
    coutMoyenParMois VARCHAR(255),
    coutLogementParMois VARCHAR(255),
    coutVieParMois VARCHAR(255),
    coutInscriptionParMois VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS PLATEFORME.ETATPARTENAIRE (
    identifiantEtatPartenaire INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nomEtatPartenaire VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS PLATEFORME.VOEU (
    identifiantVoeu INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    adresseMailVoeu VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS PLATEFORME.DOMAINEDECOMPETENCE (
    identifiantDomaineDeCompetence INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nomDomaineDeCompetence VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS PLATEFORME.UTILISATEUR (
    identifiantUtilisateur INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nomUtilisateur VARCHAR(255),
    motDePasseUtilisateur VARCHAR(255),
    adresseMailUtilisateur VARCHAR(255),
    estAdministrateur BOOLEAN
);

CREATE TABLE IF NOT EXISTS PLATEFORME.TEMPLATEMAIL (
    identifiantTemplateMail INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nomTemplateMail VARCHAR(255),
    sujetTemplateMail VARCHAR(255),
    messageHtmlTemplateMail TEXT
);

CREATE TABLE IF NOT EXISTS PLATEFORME.MAIL (
    identifiantMail INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    dateEnvoie DATE,
    estEnvoye BOOLEAN,
    sujetMail VARCHAR(255) NULL,
    messageHtmlMail TEXT NULL,
    identifiantTemplateMail INT NULL,
    identifiantPartenaire INT NOT NULL,
    FOREIGN KEY (identifiantTemplateMail) REFERENCES TEMPLATEMAIL(identifiantTemplateMail) ON DELETE CASCADE,
    FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.PARTENAIRE (
    identifiantPartenaire INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nomPartenaire VARCHAR(255),
    lienPartenaire VARCHAR(255),
    informationLogementPartenaire TEXT,
    informationCoutPartenaire TEXT,
    identifiantLocalisation INT NOT NULL,
    identifiantCout INT NOT NULL,
    identifiantEtatPartenaire INT NOT NULL,
    FOREIGN KEY (identifiantLocalisation) REFERENCES LOCALISATION(identifiantLocalisation) ON DELETE CASCADE,
    FOREIGN KEY (identifiantCout) REFERENCES COUT(identifiantCout) ON DELETE CASCADE
    FOREIGN KEY (identifiantEtatPartenaire) REFERENCES ETATPARTENAIRE(identifiantEtatPartenaire) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_PARTENAIRE_SOUSSPECIALITE (
    identifiantPartenaire INT,
    identifiantSousSpecialite INT,
    PRIMARY KEY(identifiantPartenaire, identifiantSousSpecialite),
    FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE,
    FOREIGN KEY (identifiantSousSpecialite) REFERENCES SOUSSPECIALITE(identifiantSousSpecialite) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_PARTENAIRE_MOBILITE (
    identifiantPartenaire INT,
    identifiantMobilite INT,
    PRIMARY KEY(identifiantPartenaire, identifiantMobilite),
    FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE,
    FOREIGN KEY (identifiantMobilite) REFERENCES MOBILITE(identifiantMobilite) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_PARTENAIRE_CONTACTETRANGER (
    identifiantPartenaire INT,
    identifiantContact INT,
    PRIMARY KEY(identifiantPartenaire, identifiantContact),
    FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE,
    FOREIGN KEY (identifiantContact) REFERENCES CONTACT(identifiantContact) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_PARTENAIRE_COORDINATEUR (
    identifiantPartenaire INT,
    identifiantContact INT,
    PRIMARY KEY(identifiantPartenaire, identifiantContact),
    FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE,
    FOREIGN KEY (identifiantContact) REFERENCES CONTACT(identifiantContact) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_PARTENAIRE_AIDEFINANCIERE (
    identifiantPartenaire INT,
    identifiantAideFinanciere INT,
    PRIMARY KEY(identifiantPartenaire, identifiantAideFinanciere),
    FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE,
    FOREIGN KEY (identifiantAideFinanciere) REFERENCES AIDEFINANCIERE(identifiantAideFinanciere) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_PARTENAIRE_FICHIERPARTENAIRE (
    identifiantPartenaire INT,
    identifiantFichierPartenaire INT,
    PRIMARY KEY(identifiantPartenaire, identifiantFichierPartenaire),
    FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE,
    FOREIGN KEY (identifiantFichierPartenaire) REFERENCES FICHIERPARTENAIRE(identifiantFichierPartenaire) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_PARTENAIRE_VOEU (
    identifiantPartenaire INT,
    identifiantVoeu INT,
    PRIMARY KEY(identifiantPartenaire, identifiantVoeu),
    FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE,
    FOREIGN KEY (identifiantVoeu) REFERENCES VOEU(identifiantVoeu) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_PARTENAIRE_DOMAINEDECOMPETENCE (
    identifiantPartenaire INT,
    identifiantDomaineDeCompetence INT,
    PRIMARY KEY(identifiantPartenaire, identifiantDomaineDeCompetence),
    FOREIGN KEY (identifiantPartenaire) REFERENCES PARTENAIRE(identifiantPartenaire) ON DELETE CASCADE,
    FOREIGN KEY (identifiantDomaineDeCompetence) REFERENCES DOMAINEDECOMPETENCE(identifiantDomaineDeCompetence) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_MAIL_ACONTACTETRANGER (
    identifiantMail INT,
    identifiantContact INT,
    PRIMARY KEY(identifiantMail, identifiantContact),
    FOREIGN KEY (identifiantMail) REFERENCES MAIL(identifiantMail) ON DELETE CASCADE,
    FOREIGN KEY (identifiantContact) REFERENCES CONTACT(identifiantContact) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_MAIL_ACOORDINATEUR (
    identifiantMail INT,
    identifiantContact INT,
    PRIMARY KEY(identifiantMail, identifiantContact),
    FOREIGN KEY (identifiantMail) REFERENCES MAIL(identifiantMail) ON DELETE CASCADE,
    FOREIGN KEY (identifiantContact) REFERENCES CONTACT(identifiantContact) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_MAIL_ACONTACTMAIL (
    identifiantMail INT,
    adresseMailContactMail VARCHAR(191),
    PRIMARY KEY(identifiantMail, adresseMailContactMail),
    FOREIGN KEY (identifiantMail) REFERENCES MAIL(identifiantMail) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_MAIL_CCCONTACTETRANGER (
    identifiantMail INT,
    identifiantContact INT,
    PRIMARY KEY(identifiantMail, identifiantContact),
    FOREIGN KEY (identifiantMail) REFERENCES Mail(identifiantMail) ON DELETE CASCADE,
    FOREIGN KEY (identifiantContact) REFERENCES CONTACT(identifiantContact) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_MAIL_CCCOORDINATEUR (
    identifiantMail INT,
    identifiantContact INT,
    PRIMARY KEY(identifiantMail, identifiantContact),
    FOREIGN KEY (identifiantMail) REFERENCES MAIL(identifiantMail) ON DELETE CASCADE,
    FOREIGN KEY (identifiantContact) REFERENCES CONTACT(identifiantContact) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_MAIL_CCCONTACTMAIL (
    identifiantMail INT,
    adresseMailContactMail VARCHAR(191),
    PRIMARY KEY(identifiantMail, adresseMailContactMail),
    FOREIGN KEY (identifiantMail) REFERENCES MAIL(identifiantMail) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_MAIL_CCICONTACTETRANGER (
    identifiantMail INT,
    identifiantContact INT,
    PRIMARY KEY(identifiantMail, identifiantContact),
    FOREIGN KEY (identifiantMail) REFERENCES MAIL(identifiantMail) ON DELETE CASCADE,
    FOREIGN KEY (identifiantContact) REFERENCES CONTACT(identifiantContact) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_MAIL_CCICOORDINATEUR (
    identifiantMail INT,
    identifiantContact INT,
    PRIMARY KEY(identifiantMail, identifiantContact),
    FOREIGN KEY (identifiantMail) REFERENCES MAIL(identifiantMail) ON DELETE CASCADE,
    FOREIGN KEY (identifiantContact) REFERENCES CONTACT(identifiantContact) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS PLATEFORME.CORRESPONDANCE_MAIL_CCICONTACTMAIL (
    identifiantMail INT,
    adresseMailContactMail VARCHAR(191),
    PRIMARY KEY(identifiantMail, adresseMailContactMail),
    FOREIGN KEY (identifiantMail) REFERENCES MAIL(identifiantMail) ON DELETE CASCADE
);

INSERT INTO `utilisateur`(`nomUtilisateur`, `motDePasseUtilisateur`, `adresseMailUtilisateur`, `estAdministrateur`) VALUES ("administrateur", "$2y$10$mRKvwYyS/YAZDBEVxcJy.enFX1lp0kemyJjBvThj06c9L4aMys1Jm", "mail@mail.com", true);