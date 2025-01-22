jest.mock('typeorm-transactional', () => ({
  Transactional: () => () => ({}),
  initializeTransactionalContext: () => ({}),
  BaseRepository: class {},
}));
