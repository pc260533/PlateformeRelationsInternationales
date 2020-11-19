<?php

/**
 * ExceptionSerializable est la classe abstraite qui repr�sente une exception s�rializable.
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
	 * Retourner le message d�veloppeur de l'exception.
	 * @return string
	 */
	public function getDeveloppeurMessage(): string {
		$res = "";
		if ($this->getPrevious()) {
			$res = $this->getPrevious()->getMessage();
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
	 * @param string $message Le message de l'exception � lancer.
	 * @param int $code Le code de l'exception.
	 * @param Throwable $previous L'exception pr�c�dente, utilis�e pour le cha�nage d'exception.
	 */
	public function __construct($message, $titre, $status, $code, $previous) {
		$this->status = $status;
		$this->titre = $titre;
		parent::__construct($message, $code, $previous);
	}

	/**
	 * Retourner un tableau repr�sentant l'exception s�rialisable.
	 * @return array
	 */
	public function toArray(): array {
		return array(
			"message" => $this->getMessage(),
			"titre" => $this->getTitre(),
			"status" => $this->getStatus(),
			"code" => $this->getCode(),
			"developpeurMessage" => $this->getDeveloppeurMessage(),
			"stackTrace" => $this->getStackTrace()
        );
	}

}