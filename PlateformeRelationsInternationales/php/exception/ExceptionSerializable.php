<?php

/**
 * ExceptionSerializable est la classe abstraite qui représente une exception sérializable.
 *
 * ExceptionSerializable description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
abstract class ExceptionSerializable extends Exception {
	/**
	 * Le titre de l'exception.
	 * @var mixed
	 */
	private $titre;
	/**
	 * Le statut http de l'exception.
	 * @var mixed
	 */
	private $status;

	private $ajoutDeveloppeurMessage;

	/**
	 * Retourner le titre de l'exception.
	 * @return string Le titre de l'exception.
	 */
	public function getTitre(): string {
		return $this->titre;
	}

	/**
	 * Modifier le titre de l'exception.
	 * @param string $titre
	 */
	public function setTitre(string $titre): void {
		$this->titre = $titre;
	}

	/**
	 * Retourner le statut http de l'exception.
	 * @return int Le statut http de l'exception.
	 */
	public function getStatus(): int {
		return $this->status;
	}

	/**
	 * Modifier le statu http de l'excetpion.
	 * @param int $status
	 */
	public function setStatus(int $status): void {
		$this->status = $status;
	}

	/**
	 * Retourner le message développeur de l'exception.
	 * @return string
	 */
	public function getDeveloppeurMessage(): string {
		$res = "";
		if ($this->getPrevious()) {
			$res = utf8_encode($this->getPrevious()->getMessage());
		}
		if ($this->ajoutDeveloppeurMessage) {
			$res .= utf8_encode($this->ajoutDeveloppeurMessage);
		}
		return $res;
	}

	/**
	 * Retourner le statcktrace de l'exception.
	 * @return string
	 */
	public function getStackTrace(): string {
		$res = "";
		if ($this->getPrevious()) {
			$res = $this->getPrevious()->getTraceAsString();
		}
		return $res;
	}

	/**
	 * Construit l'exception.
	 *
	 * @param string $message Le message de l'exception à lancer.
	 * @param int $code Le code de l'exception.
	 * @param Throwable $previous L'exception précédente, utilisée pour le chaînage d'exception.
	 */
	public function __construct($message, $titre, $status, $code, $previous, $ajoutDeveloppeurMessage) {
		$this->status = $status;
		$this->titre = $titre;
		$this->ajoutDeveloppeurMessage = $ajoutDeveloppeurMessage;
		parent::__construct($message, $code, $previous);
	}

	/**
	 * Retourner un tableau représentant l'exception sérialisable.
	 * @return array
	 */
	public function toArray(): array {
		return array(
			"messageErreur" => $this->getMessage(),
			"titreErreur" => $this->getTitre(),
			"statusErreur" => $this->getStatus(),
			"codeErreur" => $this->getCode(),
			"developpeurMessageErreur" => $this->getDeveloppeurMessage(),
			"stackTraceErreur" => $this->getStackTrace()
        );
	}

}