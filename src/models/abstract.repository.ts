import {
  Model,
  QueryFilter,
  ProjectionType,
  QueryOptions,
} from 'mongoose';

/**
 * A generic repository that provides common database operations
 * for any Mongoose model.
 *
 * T represents the document type (e.g. User, Product, Order).
 */
export class AbstractRepository<T> {
  /*
  The Mongoose model associated with this repository.
  */
  constructor(private readonly model: Model<T>) {}

  /**
   * Creates and saves a new document.
   *
   * Partial<T> means all properties of T are optional, allowing
   * the caller to provide only the fields needed for creation.
   *
   * Example:
   * create({ name: 'Mohamed', email: 'test@test.com' })
   */
  public async create(item: Partial<T>) {
    // Create a new Mongoose document in memory.
    const doc = new this.model(item);

    // Save the document to MongoDB and return the saved document.
    return doc.save();
  }

  /**
   * Finds a single document that matches the given filter.
   *
   * @param filter
   * Defines the search criteria.
   * Example:
   * { email: 'test@test.com' }
   *
   * @param projection
   * Specifies which fields should be included or excluded
   * in the returned document.
   * Example:
   * { password: 0 } // Exclude password
   *
   * @param options
   * Additional query options such as sorting, lean queries,
   * population, etc.
   */
  public async getOne(
    filter: QueryFilter<T>,
    projection: ProjectionType<T>,
    options: QueryOptions,
  ) {
    // Search the collection for the first document
    // that matches the filter.
    return this.model.findOne(filter, projection, options);
  }
}



//discrementorKey
//Schema Parent
// sub schema