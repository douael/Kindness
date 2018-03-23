-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le :  ven. 23 mars 2018 à 14:24
-- Version du serveur :  5.6.35
-- Version de PHP :  7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `demo`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `title`) VALUES
(1, 'cuisine'),
(2, 'outils'),
(3, 'colis');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(60) NOT NULL,
  `gender` char(1) NOT NULL,
  `age` int(11) NOT NULL,
  `address` varchar(200) NOT NULL,
  `stage` int(11) NOT NULL,
  `ndoor` int(11) NOT NULL,
  `firstlogin` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `password`, `gender`, `age`, `address`, `stage`, `ndoor`, `firstlogin`) VALUES
(1, 'Yann', 'NOUVE', 'nouve.yann@gmail.com', 'test', 'h', 23, '34 rue des fleurs', 3, 5, 1),
(2, 'Candice', 'Herbreteau', 'kind.hackathon@gmail.com', 'test', 'f', 22, '34 rue des fleurs', 5, 43, 0),
(3, 'Douae', 'El-omari', 'chapadae@gmail.com', 'test', 'f', 23, '35 rue des tulipes', 15, 4, 1),
(4, 'Camille', 'jsp', 'ploupopdorly@hotmail.fr', 'test', 'f', 23, '35 rue des tulipes', 3, 8, 1),
(6, 'Segolene', 'jsp', 'ploupopdorly@hotmail.fr', 'test', 'f', 10, '35 rue des tulipes', 1, 10, 1);

-- --------------------------------------------------------

--
-- Structure de la table `user_demande`
--

CREATE TABLE `user_demande` (
  `id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `type` varchar(50) NOT NULL,
  `element` varchar(50) NOT NULL,
  `isOk` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user_demande`
--

INSERT INTO `user_demande` (`id`, `email`, `type`, `element`, `isOk`) VALUES
(1, 'nouve.yann@gmail.com', 'cuisine', 'pain', 0),
(2, 'nouve.yann@gmail.com', 'cuisine', 'bruit', 0),
(3, 'nouve.yann@gmail.com', 'cuisine', 'bruit', 0),
(4, 'nouve.yann@gmail.com', 'cuisine', 'pain', 0),
(5, 'nouve.yann@gmail.com', 'cuisine', 'pain', 0),
(6, 'nouve.yann@gmail.com', 'cuisine', 'pain', 0),
(7, 'nouve.yann@gmail.com', 'cuisine', 'pain', 0),
(8, 'nouve.yann@gmail.com', 'cuisine', 'pain', 0),
(9, 'nouve.yann@gmail.com', 'cuisine', 'pain', 0),
(10, 'nouve.yann@gmail.com', 'cuisine', 'pain', 0),
(11, 'nouve.yann@gmail.com', 'cuisine', 'pain', 0),
(12, 'nouve.yann@gmail.com', 'outils', 'tournevis', 0),
(13, 'nouve.yann@gmail.com', 'cuisine', 'pain', 0),
(14, 'nouve.yann@gmail.com', 'cuisine', 'pain', 0),
(15, 'nouve.yann@gmail.com', 'cuisine', 'pain', 0),
(16, 'nouve.yann@gmail.com', 'cuisine', 'pain', 0),
(17, 'nouve.yann@gmail.com', 'cuisine', 'table', 0);

-- --------------------------------------------------------

--
-- Structure de la table `user_has_category`
--

CREATE TABLE `user_has_category` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `active` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user_demande`
--
ALTER TABLE `user_demande`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user_has_category`
--
ALTER TABLE `user_has_category`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT pour la table `user_demande`
--
ALTER TABLE `user_demande`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT pour la table `user_has_category`
--
ALTER TABLE `user_has_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
