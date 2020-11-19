<?php

/**
 * StockageBaseDeDonnees short summary.
 *
 * StockageBaseDeDonnees description.
 *
 * @version 1.0
 * @author Jean-Claude
 */
abstract class StockageBaseDeDonnees {
	/**
	 * Le data source name de la base de données.
	 * @var mixed
	 */
	private $dataSourceName;
	/**
	 * Le nom d'utilisateur de la base de données.
	 * @var mixed
	 */
	private $username;
	/**
	 * Le mot de passe de la base de données.
	 * @var mixed
	 */
	private $password;
	/**
	 * L'instance de pdo.
	 * @var mixed
	 */
	protected $pdo;

	public function __construct(string $dataSourceName, string $username, string $password) {
		try {
			$this->dataSourceName = $dataSourceName;
			$this->username = $username;
			$this->password = $password;
			$this->pdo = new PDO($this->dataSourceName, $this->username, $this->password);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}
		catch (PDOException $exception) {
			throw new ExceptionBaseDeDonneesPlateforme($exception);
		}
	}

}