<?php

/**
 * TemplateMail short summary.
 *
 * TemplateMail description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
class TemplateMail implements ISerializable {
	private $identifiantTemplateMail;
	private $nomTemplateMail;
	private $sujetTemplateMail;
	private $messageHtmlTemplateMail;

	public function getIdentifiantTemplateMail(): int {
		return $this->identifiantTemplateMail;
	}

	public function setIdentifiantTemplateMail(int $identifiantTemplateMail): void {
		$this->identifiantTemplateMail = $identifiantTemplateMail;
	}

	public function getNomTemplateMail(): string {
		return $this->nomTemplateMail;
	}

	public function setNomTemplateMail(string $nomTemplateMail): void {
		$this->nomTemplateMail = $nomTemplateMail;
	}

	public function getSujetTemplateMail(): string {
		return $this->sujetTemplateMail;
	}

	public function setSujetTemplateMail(string $sujetTemplateMail): void {
		$this->sujetTemplateMail = $sujetTemplateMail;
	}

	public function getMessageHtmlTemplateMail(): string {
		return $this->messageHtmlTemplateMail;
	}

	public function setMessageHtmlTemplateMail(string $messageHtmlTemplateMail): void {
		$this->messageHtmlTemplateMail = $messageHtmlTemplateMail;
	}

	public function __construct() {
		$this->identifiantTemplateMail = 0;
		$this->nomTemplateMail = "";
		$this->sujetTemplateMail = "";
		$this->messageHtmlTemplateMail = "";
	}

	#region ISerializable Members

	/**
	 *
	 * @return array
	 */
	public function getObjetSerializable(): array {
		return array(
			"identifiantTemplateMail" => $this->getIdentifiantTemplateMail(),
			"nomTemplateMail" => $this->getNomTemplateMail(),
			"sujetTemplateMail" => $this->getSujetTemplateMail(),
            "messageHtmlTemplateMail" => $this->getMessageHtmlTemplateMail()
        );
	}

	#endregion
}